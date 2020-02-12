import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

// const allowedStatus: TaskStatus[] = Object.values(TaskStatus);

export class GetNotesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
