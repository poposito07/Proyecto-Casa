import { Pool } from 'mysql2/promise';
import { PinAttempt } from '../../core/domain/models/pinAttempt';

export class PinAttemptRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async logPinAttempt(attempt: PinAttempt): Promise<void> {
    const query = 'INSERT INTO pin_attempts (userId, timestamp, success) VALUES (?, ?, ?)';
    const { userId, timestamp, success } = attempt;
    await this.pool.query(query, [userId, timestamp, success]);
  }

  async getPinAttempts(userId: number): Promise<PinAttempt[]> {
    const query = 'SELECT * FROM pin_attempts WHERE userId = ?';
    const [rows]: any = await this.pool.query(query, [userId]);
    return rows as PinAttempt[];
  }
}
