import { createParamDecorator } from '@nestjs/common';
import { IUser } from './auth.model';

export const GetUser = createParamDecorator(
  (data, req): IUser => {
    return req.user;
  }
);
