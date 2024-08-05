import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserDecoratorType {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

export const User = createParamDecorator(
  (data, context: ExecutionContext): UserDecoratorType | undefined => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
