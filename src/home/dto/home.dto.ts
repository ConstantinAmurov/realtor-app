import { PropertyType } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

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
