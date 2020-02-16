import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { NotesModule } from '../notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsSchema } from './tickets.model';

@Module({
  imports: [
    NotesModule,
    MongooseModule.forFeature([{ name: 'Tickets', schema: TicketsSchema }])
  ],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
