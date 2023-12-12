import { Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';
@Injectable()
export class PasswordService {
  getSalt() {
    return randomBytes(16).toString('hex');
  }
  getHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  }
}
