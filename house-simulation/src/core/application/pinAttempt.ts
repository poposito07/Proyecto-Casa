// pinAttempt.ts
import pool from '../../infrastructure/database/database';

export interface PinAttempt {
  id?: number;
  userId: number;
  timestamp: Date;
  success: boolean;
}

export async function logPinAttempt(userId: number, success: boolean): Promise<void> {
  const timestamp = new Date();
  await pool.query(
    'INSERT INTO pin_attempts (userId, success, timestamp) VALUES (?, ?, ?)',
    [userId, success, timestamp]
  );
}

export async function getPinAttempts(userId: number): Promise<PinAttempt[]> {
  const [rows] = await pool.query('SELECT * FROM pin_attempts WHERE userId = ? ORDER BY timestamp DESC', [userId]);
  return rows as PinAttempt[];
}
