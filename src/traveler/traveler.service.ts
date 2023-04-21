import { Injectable, ArgumentMetadata, PipeTransform, FileValidator } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { travelerDTO, userDTO } from 'src/module/Any.dto';
import { UserService } from 'src/User/user.service';
import { ContactService } from 'src/contact/contact.service';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';



@Injectable()
export class TravelerService {
        constructor(private prisma: PrismaService) { }


        async createTraveler(data: travelerDTO, file: Express.Multer.File) {
                const exists =  
                try {
                        const user = await this.prisma.user.findFirst({
                                where: {
                                        id_user: data.user,
                                }
                        })
                        const contact = await this.prisma.contact.findFirst({
                                where: {
                                        id_contact: data.contact
                                }
                        })

                        console.log('Traveler create sucefully')

                        return await this.prisma.traveler.create({
                                data: {
                                        image_link: data.image_link,
                                        image: file.buffer,
                                        user: user.id_user,
                                        contact: contact.id_contact
                                }
                        })

                } catch (error) { console.log(error) }


        }
        async allTravelers() {
                return this.prisma.traveler.findMany()
        }



        async updateTraveler(id_traveler: number, data: travelerDTO, file: Express.Multer.File) {
                try {
                        const user = await this.prisma.user.findUnique({
                                where: {
                                        id_user: data.user,
                                }
                        })
                        const contact = await this.prisma.contact.findUnique({
                                where: {
                                        id_contact: data.contact
                                }
                        })


                        return this.prisma.traveler.update({
                                data: {
                                        image_link: data.image_link,
                                        image: file.buffer
                                },
                                where: {
                                        id_traveler,
                                }

                        })
                } catch (error) { console.log(error) }

        }
}