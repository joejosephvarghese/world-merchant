import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Item[]> {
    return this.prisma.item.findMany({ orderBy: { id: 'asc' } });
  }

  async count(): Promise<{ count: number }> {
    const count = await this.prisma.item.count();
    return { count };
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Item ${id} not found`);
    return item;
  }

  create(data: Prisma.ItemCreateInput): Promise<Item> {
    return this.prisma.item.create({ data });
  }

  async update(id: number, data: Prisma.ItemUpdateInput): Promise<Item> {
    await this.findOne(id);
    return this.prisma.item.update({ where: { id }, data });
  }

  async remove(id: number): Promise<{ deleted: true; id: number }> {
    await this.findOne(id);
    await this.prisma.item.delete({ where: { id } });
    return { deleted: true, id };
  }
}
