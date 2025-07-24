import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RespuestaUsuarioDto } from '../users/dto/user.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  clubId?: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<RespuestaUsuarioDto> {
    const user = await this.authService.validateUser(payload.email);
    
    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }

    return user;
  }
}
