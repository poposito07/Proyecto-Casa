export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  pin: string;
  role: string;
}

export interface IUserRepository {
  findUserByUsername(username: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(userId: number): Promise<User | null>;
  registerUser(user: User): Promise<void>;
}
