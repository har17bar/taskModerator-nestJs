import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { INewEntity } from './newEntity.model';

@Injectable()
export class NewEntityService {
  constructor(
    @InjectModel('NewEntity') private readonly newEntityModel: Model<INewEntity>
  ) {}
}
