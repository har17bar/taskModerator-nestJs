import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayloadDto } from './dto/jwt-payload';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
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
