import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { TravelerService } from './traveler.service';
import { travelerDTO } from 'src/module/Any.dto';
import { Express } from 'express'

@Controller('traveler')
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) {}
  

  @Post("/create")
  async createTraveler(@Body()data: travelerDTO){
    return this.travelerService.createTraveler(data)
  }

  @Get("/findall")
  async findall(){
    return this.travelerService.allTravelers()
  }
}
