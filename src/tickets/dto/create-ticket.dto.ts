import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Password of User'
  })
  @IsString()
  @Matches(/^[0-9a-fA-F]{24}$/, {
    message: 'Not valid Id'
  })
  noteId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  debt: string;
}
