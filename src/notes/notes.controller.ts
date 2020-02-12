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
  ValidationPipe
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { INotes } from './notes.model';
import { CreateNotesDto } from './dto/create-notes.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
  private readonly logger = new Logger(NotesController.name);

  @Get()
  async getNotes(
    @Query(ValidationPipe) filterDto: GetNotesFilterDto
  ): Promise<INotes[]> {
    if (Object.keys(filterDto).length) {
      return this.notesService.getNotesWithFilters(filterDto);
    } else {
      return this.notesService.getNotes();
    }
  }

  @Get('/:id')
  async getNoteById(@Param('id') id: string): Promise<INotes> {
    return this.notesService.getNoteById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createNote(@Body() createNotesDto: CreateNotesDto): Promise<INotes> {
    return this.notesService.createNote(createNotesDto);
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
