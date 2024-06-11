import {
  Body,
  Controller,
  Param,
  ParseEnumPipe,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateProductKeyDto, LoginDto, RegisterDto } from '../dtos/auth.dto';
import { UserType } from '@prisma/client';
import { compare } from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register/:userType')
  register(
    @Body() body: RegisterDto,
    @Param('userType', new ParseEnumPipe(UserType)) userType: UserType,
  ) {
    if (userType === UserType.BUYER) {
      return this.authService.register(body, userType);
    }

    if (!body.productKey) {
      throw new UnauthorizedException();
    }

    const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
    const isValidProductKey = compare(validProductKey, body.productKey);

    if (!isValidProductKey) {
      throw new UnauthorizedException();
    }

    return this.authService.register(body, userType);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('/key')
  generateProductKey(@Body() body: GenerateProductKeyDto) {
    return this.authService.generateProductKey(body.email, body.userType);
  }
}
