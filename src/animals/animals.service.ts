import { Injectable } from '@nestjs/common';
import { Animal, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { capitalizeFirstLetter } from 'src/utils/capitalizeFirstLetter';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AnimalCreateInput): Promise<Animal> {
    const modifiedData: typeof data = {
      ...data,
      name: capitalizeFirstLetter(data.name),
    };

    if (data.breed !== undefined) {
      return this.prisma.animal.create({
        data: modifiedData,
      });
    }

    return this.prisma.animal.create({
      data: { ...modifiedData, breed: 'Vira-lata' },
    });
  }

  async findAll(): Promise<Animal[]> {
    return this.prisma.animal.findMany();
  }

  async findOne(id: Prisma.AnimalWhereUniqueInput): Promise<Animal> {
    return this.prisma.animal.findUnique({
      where: id,
    });
  }

  async update(
    id: Prisma.AnimalWhereUniqueInput,
    data: Prisma.AnimalUpdateInput,
  ): Promise<Animal> {
    return this.prisma.animal.update({
      data: data,
      where: id,
    });
  }

  async remove(id: Prisma.AnimalWhereUniqueInput): Promise<Animal> {
    return this.prisma.animal.delete({
      where: id,
    });
  }
}
