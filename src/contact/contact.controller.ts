import { Body, Controller, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { contactDTO } from 'src/module/Any.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Put("/Create")
    async createContact(@Body() data: contactDTO){
      return await this.contactService.creatContact(data)
    }
    
}
