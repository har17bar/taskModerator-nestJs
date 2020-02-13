import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UseFilters
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IUsers } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<IUsers>
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    try {
      const salt = await bcrypt.genSalt();
      authCredentialsDto.password = await this.hashPassword(
        authCredentialsDto.password,
        salt
      );
      authCredentialsDto.salt = salt;

      const createdCat = new this.usersModel(authCredentialsDto);
      const res = await createdCat.save();
      return res;
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
