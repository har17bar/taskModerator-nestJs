import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
  @ApiProperty()
  accessToken: string;
}
