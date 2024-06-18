import { PropertyType } from '@prisma/client';
import { Image } from '../../image/interfaces/image.interface';

export interface GetHomesFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: PropertyType;
}
export interface GetHomesParams {
  filters: GetHomesFilters;
}

export interface CreateHomeParams {
  address: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  city: string;
  price: number;
  landSize: number;
  type: PropertyType;
  images?: Image[];
}
