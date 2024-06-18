import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './interfaces/image.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  createMany(images: Image[], homeId: number) {
    const imagesToCreate = images?.map((image) => ({
      ...image,
      home_id: homeId,
    }));

    return this.prismaService.image.createMany({ data: imagesToCreate });
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
