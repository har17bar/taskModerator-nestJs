import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { IUser } from '../auth/auth.model';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  private readonly logger = new Logger(TicketsController.name);
  constructor(private readonly ticketServe: TicketsService) {}

  @Post()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CreateTicketDto
  })
  async createTicket(
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
