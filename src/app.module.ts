import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { HealthController } from './health.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ItemsModule],
  controllers: [HealthController],
})
export class AppModule {}
