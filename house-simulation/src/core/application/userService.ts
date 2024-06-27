import { PinAttemptRepository } from '../../infrastructure/database/pinAttemptRepository';
import { UserRepository } from '../../infrastructure/database/userRepository';
import { PinAttempt } from '../domain/models/pinAttempt';
import { User } from '../domain/models/user';

class UserService {
  private userRepository: UserRepository;
  private pinAttemptRepository: PinAttemptRepository;

  constructor(userRepository: UserRepository, pinAttemptRepository: PinAttemptRepository) {
    this.userRepository = userRepository;
    this.pinAttemptRepository = pinAttemptRepository;
  }

  async registerUser(user: User): Promise<void> {
    await this.userRepository.createUser(user);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findUserByUsername(username);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findUserByEmail(email);
  }

  async validateUserPin(userId: number, pin: string): Promise<boolean> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) return false;

    const isValid = user.pin === pin;
    const attempt: PinAttempt = {
      userId,
      timestamp: new Date(),
      success: isValid
    };
    await this.pinAttemptRepository.logPinAttempt(attempt);

    return isValid;
  }

  async getUserPinAttempts(userId: number): Promise<PinAttempt[]> {
    return await this.pinAttemptRepository.getPinAttempts(userId);
  }
}

export default UserService;
