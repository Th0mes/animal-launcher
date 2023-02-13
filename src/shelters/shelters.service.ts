import { Injectable } from '@nestjs/common';
import { Prisma, Shelter } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SheltersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ShelterCreateInput): Promise<Shelter> {
    // const businessHoursData: typeof data.businessHours.create = [];

    // for (let i = 0; i < [...Array(7)].length; i++) {
    //   businessHoursData.push({
    //     day: i,
    //     close: new Date(),
    //     open: new Date(),
    //   });
    // }

    return this.prisma.shelter.create({
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        // businessHours: {
        //   create: businessHoursData,
        // },
      },
    });
  }

  async findAll(): Promise<Shelter[]> {
    return this.prisma.shelter.findMany();
  }

  async findOne(id: string): Promise<Shelter> {
    return this.prisma.shelter.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: Prisma.ShelterUpdateInput): Promise<Shelter> {
    return this.prisma.shelter.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<Shelter> {
    return this.prisma.shelter.delete({
      where: {
        id,
      },
    });
  }
}
