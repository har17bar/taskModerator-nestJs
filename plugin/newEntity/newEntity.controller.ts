import { Controller, Get, Logger, Res } from '@nestjs/common';
import { NewEntityService } from './newEntity.service';
import { Response } from 'express';

@Controller('newEntity')
export class NewEntityController {
  private readonly logger = new Logger(NewEntityController.name);
  constructor(private readonly ticketServe: NewEntityService) {}

  @Get()
  async createNewEntity(@Res() res: Response) {
    res.render('newEntity', {
      menus: ['Hello world!']
    });
  }
}
