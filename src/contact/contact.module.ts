import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ContactController],
  providers: [ContactService,PrismaService]
})
export class ContactModule {}
