import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { UserType } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { LoginParams, RegisterParams } from '../interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(params: RegisterParams) {
    const userExists = await this.prismaService.user.findUnique({
      where: { email: params.email },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hash(params.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...params,
        password: hashedPassword,
        type: UserType.BUYER,
      },
    });

    const token = this.generateJWT(user.name, user.id);

    return {
      user,
      token,
    };
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
      user,
      token: this.generateJWT(user.name, user.id),
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
}
