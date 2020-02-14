import { createParamDecorator } from '@nestjs/common';
import { IUsers } from './auth.model';

export const GetUser = createParamDecorator(
  (data, req): IUsers => {
    return req.user;
  }
);
