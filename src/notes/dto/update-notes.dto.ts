import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateNotesDto {
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;
}
