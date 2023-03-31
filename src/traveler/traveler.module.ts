import { Module } from '@nestjs/common';
import { TravelerService } from './traveler.service';
import { TravelerController } from './traveler.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [TravelerController],
  providers: [TravelerService, PrismaService]
})
export class TravelerModule {}
