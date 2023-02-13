import { IsInt, IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;

  @IsString()
  shelterId: string;
}
