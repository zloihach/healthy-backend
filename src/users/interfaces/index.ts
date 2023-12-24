import { User } from '@prisma/client';
import { SignUpBodyDto } from '../../auth/dto/signup';
export interface UserServiceInterface {
  findByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;
  activateUser(id: number): Promise<User>;
  create(SignUpBodyDto: SignUpBodyDto): Promise<User>;
  getAllUsers(): Promise<User[]>;
  setUserStatus(id: number, status: boolean): Promise<User>;
  updateUser(id: number, updateUserDto: any): Promise<User>;
}
