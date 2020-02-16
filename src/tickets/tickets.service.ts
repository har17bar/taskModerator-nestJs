import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { IUser } from '../auth/auth.model';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { NotesService } from '../notes/notes.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITicket, TicketStatus } from './tickets.model';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);
  constructor(
    @InjectModel('Tickets') private readonly ticketModel: Model<ITicket>,
    private readonly notesService: NotesService
  ) {}
  async createTicket(createTicketDto: CreateTicketDto, user: IUser) {
    const note = await this.notesService.getNoteById(
      createTicketDto.noteId,
      user
    );
    if (!note) throw new BadRequestException('Note doesnt exists');
    const createdTicket = new this.ticketModel({
      ...createTicketDto,
      owner: user._id,
      status: TicketStatus.NEW
    });

    try {
      return createdTicket.save();
    } catch (error) {
      this.logger.error(
        `Failed to crate ticket for user " ${
          user.userName
        } ". Data: ${JSON.stringify(createTicketDto)} `,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }
}
