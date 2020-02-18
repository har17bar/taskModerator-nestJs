import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewEntitySchema } from './newEntity.model';
import { NewEntityController } from './newEntity.controller';
import { NewEntityService } from './newEntity.service';

@Module({})
export class NewEntityModule {
  static register(): DynamicModule {
    return {
      module: NewEntityModule,
      imports: [
        MongooseModule.forFeature([
          { name: 'NewEntity', schema: NewEntitySchema }
        ])
      ],
      controllers: [NewEntityController],
      providers: [NewEntityService]
    };
  }
}
