import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { PrismaService } from '../prisma/prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ImageService } from '../image/image.service';

@Module({
  controllers: [HomeController],
  providers: [
    HomeService,
    PrismaService,
    ImageService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class HomeModule {}
