import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto, HomeResponseDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';
import { GetHomesFilters } from './interfaces/home.interface';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get()
  async getAllHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('type') type?: PropertyType,
  ): Promise<HomeResponseDto[]> {
    const filters: GetHomesFilters = {
      ...(city && { city }),
      ...(minPrice !== undefined && { minPrice: parseFloat(minPrice) }),
      ...(maxPrice !== undefined && { maxPrice: parseFloat(maxPrice) }),
      ...(type && { type }),
    };
    return await this.homeService.getHomes({ filters });
  }

  @Get(':id')
  getHomeById(@Param('id') id: number) {
    return this.homeService.getHomeById(id);
  }
  @Post()
  createHome(@Body() body: CreateHomeDto) {
    return this.homeService.createHome(body);
  }

  @Patch(':id')
  updateHome(@Param('id') id: number) {
    return Promise.resolve();
  }
  @Delete(':id')
  deleteHome(@Param('id') id: number) {
    return Promise.resolve();
  }
  @Post(':id')
  inquireHome(@Param('id') id: number) {
    return Promise.resolve();
  }
}
