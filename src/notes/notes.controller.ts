import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Logger,
  Controller,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { INote } from './notes.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { IUser } from '../auth/auth.model';
import { DeleteNoteDto } from './dto/delete-note.dto';

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
    type: [CreateNoteDto]
  })
  async getNotes(
    @Query(ValidationPipe) filterDto: GetNotesFilterDto,
    @GetUser() user: IUser
  ): Promise<CreateNoteDto[]> {
    this.logger.verbose(
      `User "${
        user.userName
      }" retrieving all notes. FilterDto: ${JSON.stringify(filterDto)}`
    );
    return this.notesService.getNotes(filterDto, user);
  }

  @ApiOkResponse({
    status: 200,
    description: 'The found record',
    type: CreateNoteDto
  })
  @Get('/:id')
  async getNoteById(
    @Param('id') id: string,
    @GetUser() user: IUser
  ): Promise<INote> {
    return this.notesService.getNoteById(id, user);
  }

  @Post()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CreateNoteDto
  })
  async createNote(
    @Body() createNotesDto: CreateNoteDto,
    @GetUser() user: IUser
  ): Promise<INote> {
    this.logger.verbose(
      `User "${user.userName}" creating a new note. Data: ${JSON.stringify(
        createNotesDto
      )}`
    );
    return this.notesService.createNote(createNotesDto, user);
  }

  @ApiOkResponse({
    schema: {
      type: 'boolean',
      example: true
    }
  })
  @Delete('/:id')
  async deleteNote(
    @Param() deleteNoteDto: DeleteNoteDto,
    @GetUser() user: IUser
  ): Promise<boolean> {
    return this.notesService.deleteNote(deleteNoteDto.id, user);
  }

  @ApiOperation({ summary: 'Update note' })
  @Put('/:id')
  async updateNote(
    @Param('id') id: string,
    @Body() updateNotesDto: UpdateNoteDto,
    @GetUser() user: IUser
  ) {
    return this.notesService.updateNote(id, user, updateNotesDto);
  }

  // @Patch('/:id/status')
  // updateTasksStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus
  // ): INote {
  //   return this.tasksService.updateTasksStatus(id, status);
  // }
}
