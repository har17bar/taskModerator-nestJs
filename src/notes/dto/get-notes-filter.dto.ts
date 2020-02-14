import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// const allowedStatus: TaskStatus[] = Object.values(TaskStatus);

export class GetNotesFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
