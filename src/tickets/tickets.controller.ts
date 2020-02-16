import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { NotesService } from '../notes/notes.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { IUser } from '../auth/auth.model';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  private readonly logger = new Logger(TicketsController.name);
  constructor(private readonly ticketServe: TicketsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateTicketDto
  })
  async createNote(
    @Body() createTicketDto: CreateTicketDto,
    @GetUser() user: IUser
  ): Promise<any> {
    this.logger.verbose(
      `User "${user.userName}" creating a new note. Data: ${JSON.stringify(
        createTicketDto
      )}`
    );
    return this.ticketServe.createTicket(createTicketDto, user);
  }
}
