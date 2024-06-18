import { PropertyType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateImageDto } from '../../image/dto/create-image.dto';

export class HomeResponseDto {
  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }

  id: number;
  address: string;
  @Expose({ name: 'numberOfBedrooms' })
  nr_bedrooms: number;

  @Expose({ name: 'numberOfBathrooms' })
  nr_bathrooms: number;
  city: string;
  @Expose({ name: 'listedDate' })
  listed_date: Date;
  price: number;
  @Expose({ name: 'landSize' })
  land_size: number;
  type: PropertyType;

  @Exclude()
  realtor_id: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  numberOfBedrooms: number;

  @IsNumber()
  @IsPositive()
  numberOfBathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  landSize: number;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  images: CreateImageDto[];
}
