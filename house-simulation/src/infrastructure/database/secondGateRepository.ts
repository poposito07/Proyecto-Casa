// infrastructure/database/secondGateRepository.ts

import { ISecondGateRepository, SecondGateState } from '../../core/domain/models/SecondGate';
import pool from './database';

export class SecondGateRepository implements ISecondGateRepository {
  async getSecondGateState(): Promise<SecondGateState> {
    const [rows] = await pool.query('SELECT * FROM second_gate ORDER BY timestamp DESC LIMIT 1');
    const gateStates = rows as SecondGateState[];
    return gateStates.length > 0 ? gateStates[0] : { state: 'closed' };
  }

  async updateSecondGateState(state: 'open' | 'closed'): Promise<void> {
    await pool.query(
      'INSERT INTO second_gate (state, timestamp) VALUES (?, ?)',
      [state, new Date()]
    );
  }
}
