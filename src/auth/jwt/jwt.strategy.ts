import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { RoleName } from 'src/users/roles/role.entity';

export type JwtUser = {
  id: number;
  role: RoleName;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('NEST_JWT_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(_, payload: any): Promise<JwtUser> {
    return { id: payload.sub, role: payload.role };
  }
}
