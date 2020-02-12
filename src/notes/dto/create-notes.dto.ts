import { IsNotEmpty } from 'class-validator';

export class CreateNotesDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
