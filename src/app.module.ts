import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import * as config from 'config';

const dbConfig = config.get('db');
const DbHost = process.env.DB_HOSTENAME || dbConfig.host;
const DbPort = process.env.DB_PORT || dbConfig.port;
const DbDatabaseName = process.env.DB_DATABASENAME || dbConfig.databaseName;

@Module({
  imports: [
    MongooseModule.forRoot(`${DbHost}:${DbPort}/${DbDatabaseName}`, {
      useCreateIndex: true,
      useNewUrlParser: true
    }),
    NotesModule,
    AuthModule,
    TicketsModule
  ],
  providers: []
})
export class AppModule {}
