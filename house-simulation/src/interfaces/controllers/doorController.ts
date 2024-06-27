import { Request, Response } from 'express';
import { Resend } from 'resend'; // Importar Resend para enviar correos electrónicos
import { DoorService } from '../../core/application/doorService';
import { DoorRepository } from '../../infrastructure/database/doorReporsitory'; // Corregido: Nombre corregido del repositorio

const doorRepository = new DoorRepository();
const doorService = new DoorService(doorRepository);

// Configurar Resend con tu API Key
const resend = new Resend('re_F9TjLm1Y_5rtAKKBviECKbbSX5muF867B'); // Reemplazar con tu API key de Resend

export async function getDoorState(req: Request, res: Response): Promise<void> {
  try {
    const doorState = await doorService.getDoorState();
    res.json(doorState);
  } catch (error: unknown) {
    console.error('Error obteniendo el estado de la puerta:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error al obtener el estado de la puerta', error: error.message });
    } else {
      res.status(500).json({ message: 'Un error desconocido ocurrió' });
    }
  }
}

export async function updateDoorState(req: Request, res: Response): Promise<void> {
  const { state } = req.body;

  try {
    await doorService.updateDoorState(state);

    // Enviar correo electrónico utilizando Resend cuando se actualice el estado de la puerta
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: '231205@ids.upchiapas.edu.mx', // Cambiar al correo específico deseado
      subject: 'Estado de la Puerta Actualizado',
      html: `<p>El estado de la puerta ha sido actualizado a: ${state}</p>`,
    });

    res.json({ message: 'Estado de la puerta actualizado exitosamente y correo electrónico enviado' });
  } catch (error: unknown) {
    console.error('Error actualizando el estado de la puerta:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error al actualizar el estado de la puerta', error: error.message });
    } else {
      res.status(500).json({ message: 'Un error desconocido ocurrió' });
    }
  }
}
