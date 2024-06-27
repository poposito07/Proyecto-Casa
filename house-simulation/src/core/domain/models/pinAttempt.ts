import pool from '../../../infrastructure/database/database';

export interface PinAttempt {
  id?: number;
  userId: number;
  timestamp: Date;
  success: boolean;
}

export async function logPinAttempt(userId: number, pinAttempt: string, success: boolean): Promise<void> {
  const timestamp = new Date();
  await pool.query(
    'INSERT INTO pin_attempts (user_id, pin_attempt, success, timestamp) VALUES (?, ?, ?, ?)',
    [userId, pinAttempt, success, timestamp]
  );
}

export async function getPinAttempts(userId: number): Promise<PinAttempt[]> {
  const [rows] = await pool.query('SELECT * FROM pin_attempts WHERE user_id = ? ORDER BY timestamp DESC', [userId]);
  return rows as PinAttempt[];
}
