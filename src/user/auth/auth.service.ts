import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { UserType } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { LoginParams, RegisterParams } from '../interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(params: RegisterParams, userType: UserType) {
    const userExists = await this.prismaService.user.findUnique({
      where: { email: params.email },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hash(params.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email: params.email,
        name: params.name,
        phone: params.phone,
        password: hashedPassword,
        type: userType,
      },
    });

    const accessToken = this.generateJWT(user.name, user.id);

    return { accessToken };
  }

  async login(params: LoginParams) {
    const user = await this.prismaService.user.findUnique({
      where: { email: params.email },
    });

    if (!user) {
      throw new HttpException('Invalid Credentials', 400);
    }

    const hashedPassword = user.password;
    const isValidPassword = await compare(params.password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid Credentials', 400);
    }
    return {
      accessToken: this.generateJWT(user.name, user.id),
    };
  }

  private generateJWT(name: string, id: number) {
    return sign(
      {
        name: name,
        id: id,
      },
      process.env.JSON_WEBTOKEN_KEY,
      {
        expiresIn: '1d',
      },
    );
  }

  generateProductKey(email: string, userType: UserType) {
    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
    return hash(string, 10);
  }
}
