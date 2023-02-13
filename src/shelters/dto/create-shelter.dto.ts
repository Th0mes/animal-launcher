import { IsArray, IsDate, IsInt, IsString } from 'class-validator';

class BusinessHoursDto {
  @IsInt()
  day: number;

  @IsDate()
  open: Date;

  @IsDate()
  close: Date;
}

export class CreateShelterDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  // @IsArray()
  // businessHours: BusinessHoursDto[];
}
