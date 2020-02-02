import {
    Controller,
    Body,
    Get,
    Post,
    Param,
    Patch,
    Delete,
    Put,
    Query,
    Logger,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./tasks.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {}
    private readonly logger = new Logger(TasksController.name);

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        this.logger.log(JSON.stringify( filterDto));
        if (Object.keys(filterDto).length){
           return this.tasksService.getTasksWithFilters(filterDto)
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTasksStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.tasksService.updateTasksStatus(id,status)
    }
}
