import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { JwtPayload, IUsers } from './auth.model';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<IUsers>,
    private jwtService: JwtService
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
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<JwtPayload> {
    return this.validateUserPassword(authCredentialsDto);
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<JwtPayload> {
    const { userName, password } = authCredentialsDto;
    const user: IUsers = await this.usersModel.findOne({ userName });
    if (user && (await this.validatePassword(password, user))) {
      const accessToken = this.jwtService.sign({
        userName: user.userName,
        _id: user._id
      });
      return { accessToken };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validatePassword(password, user) {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
