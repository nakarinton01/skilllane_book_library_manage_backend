import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { User } from 'src/users/users/user.entity';
import { UsersService } from 'src/users/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<User | null>> {
    const user = await this.usersService.findByUsername(username);

    if (user && (await compare(pass, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: Partial<User>) {
    const payload = {
      sub: user.id,
      role: user.role ? user.role.name : '',
    };

    console.log(user);

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
