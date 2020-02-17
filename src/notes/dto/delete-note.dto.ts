import { Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNoteDto {
  @ApiProperty()
  @Matches(/^[0-9a-fA-F]{24}$/, {
    message: 'Not valid Id'
  })
  id: string;
}
