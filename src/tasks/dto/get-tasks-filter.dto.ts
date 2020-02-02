import { TaskStatus } from "../tasks.interface";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

const allowedStatus: TaskStatus[] = Object.values(TaskStatus);

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn(allowedStatus)
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string
}