import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { contactDTO } from 'src/module/Any.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post("/create")
    async createContact(@Body() data: contactDTO){
      return await this.contactService.creatContact(data)
    }
  @Get("/findall")
  async findall(){
    return this.contactService.findall()
  }
}
