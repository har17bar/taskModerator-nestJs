import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from './auth.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<IUsers>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret'
    });
  }

  async validate(payload) {
    const { userName } = payload;
    const user = await this.usersModel.findOne({ userName });
    if (!user) {
      throw new UnauthorizedException('Credentials invalid');
    }

    return user;
  }
}
