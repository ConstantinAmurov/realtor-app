import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';
import { Prisma } from '@prisma/client';
import {
  CreateHomeParams,
  GetHomesFilters,
  GetHomesParams,
} from './interfaces/home.interface';
import { ImageService } from '../image/image.service';

@Injectable()
export class HomeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imageService: ImageService,
  ) {}

  private getHomeSelectFields(): Prisma.HomeSelect {
    return {
      id: true,
      address: true,
      city: true,
      price: true,
      type: true,
      nr_bathrooms: true,
      nr_bedrooms: true,
      images: {
        select: {
          id: true,
          url: true,
        },
      },
    };
  }

  private buildHomeSelectFilters(
    filters: GetHomesFilters,
  ): Prisma.HomeWhereInput {
    const whereClause: Prisma.HomeWhereInput = {};
    if (filters.city) {
      whereClause.city = filters.city;
    }

    if (filters.minPrice && filters.maxPrice) {
      whereClause.price = {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      };
    } else if (filters.minPrice) {
      whereClause.price = {
        gte: filters.minPrice,
      };
    } else if (filters.maxPrice) {
      whereClause.price = {
        lte: filters.maxPrice,
      };
    }

    return whereClause;
  }
  async getHomes({ filters }: GetHomesParams): Promise<HomeResponseDto[]> {
    const homes = await this.prismaService.home.findMany({
      select: this.getHomeSelectFields(),
      where: this.buildHomeSelectFilters(filters),
    });
    return homes.map((home) => new HomeResponseDto(home));
  }

  async getHomeById(id: number) {
    const home = await this.prismaService.home.findUnique({ where: { id } });

    if (!home) {
      throw new HttpException('Not Found', 400);
    }

    return new HomeResponseDto(home);
  }

  async createHome(params: CreateHomeParams) {
    const {
      numberOfBathrooms,
      numberOfBedrooms,
      address,
      city,
      landSize,
      type,
      price,
      images,
    } = params;

    const home = await this.prismaService.home.create({
      data: {
        address,
        nr_bathrooms: numberOfBathrooms,
        nr_bedrooms: numberOfBedrooms,
        city,
        land_size: landSize,
        type,
        price,
        realtor_id: 1,
      },
    });

    this.imageService.createMany(images, home.id);

    return new HomeResponseDto(home);
  }
}
