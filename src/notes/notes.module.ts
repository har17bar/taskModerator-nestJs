import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesSchema } from './notes.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notes', schema: NotesSchema }])
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService]
})
export class NotesModule {}
