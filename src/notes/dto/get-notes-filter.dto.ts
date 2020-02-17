import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetNotesFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
