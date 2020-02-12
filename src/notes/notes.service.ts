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

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('Notes') private readonly notesModel: Model<INotes>
  ) {}

  async getNotes(): Promise<INotes[]> {
    return this.notesModel.find().exec();
  }

  async getNoteById(id: string): Promise<INotes> {
    const found = await this.notesModel.findOne(Types.ObjectId(id));

    if (!found) {
      throw new NotFoundException(`Note with ID '${id}' not found`);
    }

    return found;
  }

  async getNotesWithFilters(filterDto: GetNotesFilterDto): Promise<INotes[]> {
    const { search } = filterDto;
    let notes = await this.getNotes();

    if (search) {
      notes = notes.filter(note => {
        return note.title.includes(search) || note.description.includes(search);
      });
    }

    return notes;
  }

  async createNote(createNotesDto: CreateNotesDto): Promise<INotes> {
    const createdCat = new this.notesModel(createNotesDto);
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
