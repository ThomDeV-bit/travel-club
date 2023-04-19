import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { TravelerModule } from './traveler/traveler.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [UserModule, TravelerModule, ContactModule],
  controllers : [],
  providers : []

  
})

export class AppModule {}

