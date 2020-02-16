import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './auth.model';
import * as config from 'config';

const jwtConfig = config.get('jwt');
const JwtSecret = process.env.JWT_SECRET || jwtConfig.secret;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('Users') private readonly usersModel: Model<IUser>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtSecret
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
