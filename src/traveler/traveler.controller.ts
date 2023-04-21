import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TravelerService } from './traveler.service';
import { travelerDTO } from 'src/module/Any.dto';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { json } from 'stream/consumers';

@Controller('traveler')
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) { }


  @Post("/create")
  @UseInterceptors(FileInterceptor('file'))
  async createTraveler(@Body('data') data: string, @UploadedFile() file: Express.Multer.File) {
    console.log(data)
    return this.travelerService.createTraveler(JSON.parse(data), file)
  }


  @Get("/findall")
  async findall() {
    return this.travelerService.allTravelers()
  }


  @Put("update/:id")
  @UseInterceptors(FileInterceptor('file'))
  async updateTraveler(@Param("id", ParseIntPipe) id_traveler: number, @Body() data: travelerDTO,
  file: Express.Multer.File) {
    return this.travelerService.updateTraveler(id_traveler, data, file)
  }

}
