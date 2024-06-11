import { PropertyType } from '@prisma/client';

export interface GetHomesFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: PropertyType;
}
export interface GetHomesParams {
  filters: GetHomesFilters;
}
