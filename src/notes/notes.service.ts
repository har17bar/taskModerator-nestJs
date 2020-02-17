import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { INote } from './notes.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { IUser } from '../auth/auth.model';

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);

  constructor(
    @InjectModel('Notes') private readonly notesModel: Model<INote>
  ) {}

  async getNotes(filterDto: GetNotesFilterDto, user: IUser): Promise<INote[]> {
    const { search } = filterDto;
    let query: object = { created_by: user._id };
    if (search) {
      query = { ...query, $or: [{ title: search }, { description: search }] };
    }

    try {
      return this.notesModel.find(query).exec();
    } catch (error) {
      this.logger.error(
        `Failed to get notes for user " ${
          user.userName
        } " DTO: ${JSON.stringify(filterDto)}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  async getNoteById(id: string, user: IUser): Promise<INote> {
    const found = await this.notesModel.findOne({
      created_by: user._id,
      _id: Types.ObjectId(id)
    });

    if (!found) {
      throw new NotFoundException(`Note with ID '${id}' not found`);
    }

    return found;
  }

  async createNote(createNotesDto: CreateNoteDto, user: IUser): Promise<INote> {
    const createdCat = new this.notesModel({
      ...createNotesDto,
      created_by: user._id
    });

    try {
      return createdCat.save();
    } catch (error) {
      this.logger.error(
        `Failed to crate note for user " ${
          user.userName
        } ". Data: ${JSON.stringify(createNotesDto)} `,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  async deleteNote(id: string, user: IUser): Promise<boolean> {
    const res = await this.notesModel
      .deleteOne({
        created_by: user._id,
        _id: Types.ObjectId(id)
      })
      .exec();
    return Boolean(res.n);
  }

  async updateNote(id: string, user: IUser, updateNotesDto: UpdateNoteDto) {
    if (updateNotesDto.description || updateNotesDto.title) {
      const updatedResult = await this.notesModel.findOneAndUpdate(
        { created_by: user._id, _id: Types.ObjectId(id) },
        updateNotesDto,
        { new: true }
      );
      if (updatedResult) {
        return updatedResult;
      }
    }
    throw new BadRequestException();
  }
}
