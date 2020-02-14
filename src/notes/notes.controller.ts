import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Logger,
  UsePipes,
  Controller,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { INotes } from './notes.model';
import { CreateNotesDto } from './dto/create-notes.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { IUsers } from '../auth/auth.model';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
  private readonly logger = new Logger(NotesController.name);

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'The found records',
    type: [CreateNotesDto]
  })
  async getNotes(
    @Query(ValidationPipe) filterDto: GetNotesFilterDto
  ): Promise<INotes[]> {
    if (Object.keys(filterDto).length) {
      return this.notesService.getNotesWithFilters(filterDto);
    } else {
      return this.notesService.getNotes();
    }
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateNotesDto
  })
  @Get('/:id')
  async getNoteById(@Param('id') id: string): Promise<INotes> {
    return this.notesService.getNoteById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateNotesDto
  })
  @UsePipes(ValidationPipe)
  async createNote(
    @Body() createNotesDto: CreateNotesDto,
    @GetUser() user: IUsers
  ): Promise<INotes> {
    return this.notesService.createNote(createNotesDto, user);
  }

  @Delete('/:id')
  async deleteNote(@Param('id') id: string): Promise<boolean> {
    return this.notesService.deleteNote(id);
  }

  @Put('/:id')
  updateTasksStatus(
    @Param('id') id: string,
    @Body() updateNotesDto: UpdateNotesDto
  ) {
    return this.notesService.updateNote(id, updateNotesDto);
  }

  // @Patch('/:id/status')
  // updateTasksStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus
  // ): INotes {
  //   return this.tasksService.updateTasksStatus(id, status);
  // }
}
