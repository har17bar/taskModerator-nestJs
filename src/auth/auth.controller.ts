import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  ValidationPipe
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayloadDto } from './dto/jwt-payload';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/signup')
  async signUp(@Res() res: Response) {
    res.render('index', {
      message: 'Hello world!'
    });
    // return this.authService.signUp(authCredentialsDto);
  }

  @ApiOkResponse({
    status: 200,
    description: 'The jwt token',
    type: JwtPayloadDto
  })
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<JwtPayloadDto> {
    return this.authService.signIn(authCredentialsDto);
  }
}
