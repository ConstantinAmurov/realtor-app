import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserType } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/(\+)?(\(?\d+\)?)(([\s-]+)?(\d+)){0,}/g, {
    message: 'phone must be valid',
  })
  phone: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productKey?: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class GenerateProductKeyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserType)
  userType: UserType;
}
