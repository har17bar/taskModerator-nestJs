import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    NotesModule,
    AuthModule
  ],
  providers: []
})
export class AppModule {}
