import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseFilters,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  // @Post('/signin')
  // signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
  //     return this.authService.signIn(authCredentialsDto);
  // }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@Req() req) {
  //     console.log(req);
  // }
}
