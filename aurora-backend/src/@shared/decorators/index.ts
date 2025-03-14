import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadType } from '../types';
import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../metadata';
export const ROLES_METADATA = 'roles';

export const Payload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as PayloadType;
  },
);

export const RolesDecorator = (...roles: ROLE[]) =>
  SetMetadata(ROLES_METADATA, roles);
