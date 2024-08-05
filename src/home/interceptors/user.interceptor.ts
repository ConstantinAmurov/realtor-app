import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { decode } from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const accessToken = request?.headers?.authorization;

    const user = decode(accessToken);
    request.user = user;

    return handler.handle();
  }
}
