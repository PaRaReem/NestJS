import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '../utils/async-storage.util';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestID = uuidv4();
    AsyncStorage.run(() => {
      AsyncStorage.set('requestID', requestID);
      next();
    });
  }
}
