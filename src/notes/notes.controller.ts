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
import { IUser } from '../auth/auth.model';

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
    @Query(ValidationPipe) filterDto: GetNotesFilterDto,
    @GetUser() user: IUser
  ): Promise<CreateNotesDto[]> {
    this.logger.verbose(
      `User "${
        user.userName
      }" retrieving all notes. FilterDto: ${JSON.stringify(filterDto)}`
    );
    return this.notesService.getNotes(filterDto, user);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateNotesDto
  })
  @Get('/:id')
  async getNoteById(
    @Param('id') id: string,
    @GetUser() user: IUser
  ): Promise<INote> {
    return this.notesService.getNoteById(id, user);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateNotesDto
  })
  async createNote(
    @Body() createNotesDto: CreateNotesDto,
    @GetUser() user: IUser
  ): Promise<INote> {
    this.logger.verbose(
      `User "${user.userName}" creating a new note. Data: ${JSON.stringify(
        createNotesDto
      )}`
    );
    return this.notesService.createNote(createNotesDto, user);
  }

  @Delete('/:id')
  async deleteNote(
    @Param('id') id: string,
    @GetUser() user: IUser
  ): Promise<boolean> {
    return this.notesService.deleteNote(id, user);
  }

  @Put('/:id')
  async updateTasksStatus(
    @Param('id') id: string,
    @Body() updateNotesDto: UpdateNotesDto,
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
