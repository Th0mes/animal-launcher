import { Injectable } from '@nestjs/common';
import { BusinessHours, Shelter } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';

type ShelterWithBusinessHours = Shelter & {
  businessHours: BusinessHours[];
};

@Injectable()
export class SheltersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateShelterDto): Promise<Shelter> {
    const businessHoursData: typeof data.businessHours = [];

    for (let i = 0; i < [...Array(7)].length; i++) {
      businessHoursData.push({
        day: i,
        close: new Date(),
        open: new Date(),
      });
    }

    return this.prisma.shelter.create({
      data: {
        name: data.name,
        zipcode: data.address.zipcode,
        city: data.address.city,
        neighborhood: data.address.neighborhood,
        street: data.address.street,
        number: data.address.number,
        phone: data.phone,
        businessHours: {
          create: businessHoursData,
        },
      },
    });
  }

  async findAll(): Promise<ShelterWithBusinessHours[]> {
    return this.prisma.shelter.findMany({
      include: {
        businessHours: true,
      },
    });
  }

  async findOne(id: string): Promise<ShelterWithBusinessHours> {
    return this.prisma.shelter.findUnique({
      where: {
        id,
      },
      include: {
        businessHours: true,
      },
    });
  }

  async update(
    id: string,
    data: UpdateShelterDto,
  ): Promise<ShelterWithBusinessHours> {
    return this.prisma.shelter.update({
      data: {
        name: data.name,
        zipcode: data.address.zipcode,
        city: data.address.city,
        neighborhood: data.address.neighborhood,
        street: data.address.street,
        number: data.address.number,
        phone: data.phone,
      },
      where: {
        id: id,
      },
      include: {
        businessHours: true,
      },
    });
  }

  async remove(id: string): Promise<ShelterWithBusinessHours> {
    return this.prisma.shelter.delete({
      where: {
        id,
      },
      include: {
        businessHours: true,
      },
    });
  }
}
