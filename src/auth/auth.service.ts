import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
