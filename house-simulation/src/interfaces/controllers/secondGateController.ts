import { Request, Response } from 'express';
import { Resend } from 'resend'; // Importar Resend para enviar correos electrónicos
import { SecondGateRepository } from '../../infrastructure/database/secondGateRepository'; // Repositorio de la segunda puerta

const secondGateRepository = new SecondGateRepository();

// Configurar Resend con tu API Key
const resend = new Resend('re_F9TjLm1Y_5rtAKKBviECKbbSX5muF867B'); // Reemplazar con tu API key de Resend

// Controlador para obtener el estado de la segunda puerta
export async function getSecondGateState(req: Request, res: Response): Promise<void> {
  try {
    const secondGateState = await secondGateRepository.getSecondGateState();
    res.json(secondGateState);
  } catch (error: any) { // Asegura que TypeScript pueda inferir el tipo 'any' para 'error'
    console.error('Error obteniendo el estado de la segunda puerta:', error);
    res.status(500).json({ message: 'Error al obtener el estado de la segunda puerta', error: error.message });
  }
}

// Controlador para actualizar el estado de la segunda puerta
export async function updateSecondGateState(req: Request, res: Response): Promise<void> {
  const { state } = req.body;

  try {
    await secondGateRepository.updateSecondGateState(state);

    // Enviar correo electrónico utilizando Resend cuando se actualice el estado de la segunda puerta
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: '231205@ids.upchiapas.edu.mx',
      subject: 'Estado de la Segunda Puerta Actualizado',
      html: `<p>El estado de la segunda puerta ha sido actualizado a: ${state}</p>`,
    });

    res.json({ message: 'Estado de la segunda puerta actualizado exitosamente y correo electrónico enviado' });
  } catch (error: any) {
    console.error('Error actualizando el estado de la segunda puerta:', error);
    res.status(500).json({ message: 'Error al actualizar el estado de la segunda puerta', error: error.message });
  }
}
