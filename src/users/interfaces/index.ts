import { User } from '@prisma/client';
import { SignUpBodyDto } from '../../auth/dto/signup';
export interface UserServiceInterface {
  activateUser(id: number): Promise<User>;

  create(SignUpBodyDto: SignUpBodyDto, hash, salt): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  getAllUsers(): Promise<User[]>;

  getUserById(id: number): Promise<User | null>;

  setUserStatus(id: number, status: boolean): Promise<User>;

  updateUser(id: number, updateUserDto: any): Promise<User>;
}
