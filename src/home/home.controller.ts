import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';
import { GetHomesFilters } from './interfaces/home.interface';
import { User, UserDecoratorType } from './decorators/user.decorator';
import { UserModule } from '../user/user.module';

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
  createHome(@Body() body: CreateHomeDto, @User() user: UserDecoratorType) {
    return this.homeService.createHome(body, user.id);
  }

  @Patch(':id')
  updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHomeDto,
  ) {
    return this.homeService.updateHomeById(id, body);
  }
  @Delete(':id')
  deleteHome(@Param('id', ParseIntPipe) id: number) {
    return this.homeService.deleteHomeById(id);
  }
  @Post(':id')
  inquireHome() {
    return Promise.resolve();
  }
}
