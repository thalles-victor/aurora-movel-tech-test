import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadType } from '../types';

export const Payload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as PayloadType;
  },
);
