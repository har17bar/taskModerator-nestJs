import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  Logger
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IUsers } from './auth.model';
import { JwtPayloadDto } from './dto/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
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
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<JwtPayloadDto> {
    return this.validateUserPassword(authCredentialsDto);
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<JwtPayloadDto> {
    const { userName, password } = authCredentialsDto;
    const user: IUsers = await this.usersModel.findOne({ userName });
    if (user && (await this.validatePassword(password, user))) {
      const payload = {
        userName: user.userName,
        _id: user._id
      };
      const accessToken = this.jwtService.sign(payload);
      this.logger.debug(
        `Genereted JWT Token with payload ${JSON.stringify(payload)}`
      );
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
