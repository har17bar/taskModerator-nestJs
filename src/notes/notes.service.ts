import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { INotes } from './notes.model';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { GetUser } from '../auth/get-user.decorator';
import { IUsers } from '../auth/auth.model';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('Notes') private readonly notesModel: Model<INotes>
  ) {}

  async getNotes(
    filterDto: GetNotesFilterDto,
    user: IUsers
  ): Promise<INotes[]> {
    const { search } = filterDto;
    console.log(search, 'search');
    return this.notesModel
      .find({
        title: /^search/,
        description: new RegExp(search, 'i'),
        created_by: user._id
      })
      .exec();
  }

  async getNoteById(id: string, user: IUsers): Promise<INotes> {
    const found = await this.notesModel.findOne({
      created_by: user._id,
      _id: Types.ObjectId(id)
    });

    if (!found) {
      throw new NotFoundException(`Note with ID '${id}' not found`);
    }

    return found;
  }

  async createNote(
    createNotesDto: CreateNotesDto,
    user: IUsers
  ): Promise<INotes> {
    const createdCat = new this.notesModel({
      ...createNotesDto,
      created_by: user._id
    });
    return createdCat.save();
  }

  async deleteNote(id: string): Promise<boolean> {
    const res = await this.notesModel
      .deleteOne({ _id: Types.ObjectId(id) })
      .exec();
    return Boolean(res.n);
  }

  async updateNote(id: string, updateNotesDto: UpdateNotesDto) {
    if (updateNotesDto.description || updateNotesDto.title) {
      return this.notesModel.findOneAndUpdate(
        { _id: Types.ObjectId(id) },
        updateNotesDto,
        { new: true }
      );
    }
    throw new BadRequestException();
  }
}
