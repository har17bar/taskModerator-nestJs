import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({
    description: 'Username of User'
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @ApiProperty({
    description: 'Password of User'
  })
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, {
    message: 'Password too weak'
  })
  password: string;
  salt: string;
}
