import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { TravelerModule } from './traveler/traveler.module';

@Module({
  imports: [UserModule, TravelerModule],
  controllers : [],
  providers : []

  
})

export class AppModule {}

