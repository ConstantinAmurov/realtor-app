import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';

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
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
