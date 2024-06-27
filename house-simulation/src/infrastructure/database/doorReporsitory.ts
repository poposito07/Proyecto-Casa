import { DoorState, IDoorRepository } from '../../core/domain/models/door';
import pool from './database';

export class DoorRepository implements IDoorRepository {
  async getDoorState(): Promise<DoorState> {
    const [rows] = await pool.query('SELECT * FROM doors ORDER BY timestamp DESC LIMIT 1');
    const doorStates = rows as DoorState[];
    return doorStates.length > 0 ? doorStates[0] : { state: 'closed' };
  }

  async updateDoorState(state: 'open' | 'closed'): Promise<void> {
    await pool.query(
      'INSERT INTO doors (state, timestamp) VALUES (?, ?)',
      [state, new Date()]
    );
  }
}
