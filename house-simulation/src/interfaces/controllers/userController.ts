import { Request, Response } from 'express';
import { Resend } from 'resend'; // Importa Resend
import UserService from '../../core/application/userService';
import pool from '../../infrastructure/database/database';
import { PinAttemptRepository } from '../../infrastructure/database/pinAttemptRepository';
import { UserRepository } from '../../infrastructure/database/userRepository';

const userRepository = new UserRepository(pool);
const pinAttemptRepository = new PinAttemptRepository(pool);
const userService = new UserService(userRepository, pinAttemptRepository);

const resend = new Resend('re_F9TjLm1Y_5rtAKKBviECKbbSX5muF867B');

export async function registerUser(req: Request, res: Response): Promise<void> {
  const { username, password, email, pin, role } = req.body;

  const existingUser = await userService.findUserByUsername(username);
  if (existingUser) {
    res.status(400).json({ message: 'Username already exists' });
    return;
  }

  const existingEmail = await userService.findUserByEmail(email);
  if (existingEmail) {
    res.status(400).json({ message: 'Email already in use' });
    return;
  }

  const newUser = {
    username,
    password,
    email,
    pin,
    role
  };

  try {
    await userService.registerUser(newUser);

    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'a20624646@gmail.com',
      subject: 'Bienvenido a la aplicación',
      html: `<p>Hola ${username},</p><p>Gracias por registrarte. ¡Bienvenido a nuestra aplicación!</p>`,
    });

    res.json({ message: 'User registered successfully and email sent' });
  } catch (error) {
    console.error('Error registering user or sending email:', error);
    res.status(500).json({ message: 'Failed to register user or send email' });
  }
}

export async function getPinAttempts(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;

  try {
    const attempts = await userService.getUserPinAttempts(Number(userId));
    res.json(attempts);
  } catch (error) {
    console.error('Error fetching pin attempts:', error);
    res.status(500).json({ message: 'Failed to fetch pin attempts' });
  }
}

export async function validatePin(req: Request, res: Response): Promise<void> {
  const { userId, pin } = req.body;

  try {
    const isValid = await userService.validateUserPin(userId, pin);
    res.json({ isValid });
  } catch (error) {
    console.error('Error validating pin:', error);
    res.status(500).json({ message: 'Failed to validate pin' });
  }
}
