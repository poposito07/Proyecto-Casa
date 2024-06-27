import { Pool } from 'mysql2/promise';
import { User } from '../../core/domain/models/user';

export class UserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async createUser(user: User): Promise<void> {
    const query = 'INSERT INTO users (username, password, email, pin, role) VALUES (?, ?, ?, ?, ?)';
    const { username, password, email, pin, role } = user;
    await this.pool.query(query, [username, password, email, pin, role]);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows]: any = await this.pool.query(query, [username]);
    return rows.length ? (rows[0] as User) : null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows]: any = await this.pool.query(query, [email]);
    return rows.length ? (rows[0] as User) : null;
  }

  async findUserById(userId: number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows]: any = await this.pool.query(query, [userId]);
    return rows.length ? (rows[0] as User) : null;
  }
}
