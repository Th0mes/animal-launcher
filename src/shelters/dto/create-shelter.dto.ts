import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class BusinessHoursDto {
  @IsInt()
  day: number;

  @IsDateString()
  open: Date;

  @IsDateString()
  close: Date;
}

class Address {
  @IsString()
  zipcode: string;

  @IsString()
  city: string;

  @IsString()
  neighborhood: string;

  @IsString()
  street: string;

  @IsString()
  number: string;
}

export class CreateShelterDto {
  @IsString()
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsString()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BusinessHoursDto)
  businessHours: BusinessHoursDto[];
}
