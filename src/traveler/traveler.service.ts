import { Injectable, ArgumentMetadata, PipeTransform, FileValidator } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { travelerDTO, userDTO } from 'src/module/Any.dto';
import { UserService } from 'src/User/user.service';
import { ContactService } from 'src/contact/contact.service';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { exists } from 'fs';
import { error } from 'console';



@Injectable()
export class TravelerService {
        constructor(private prisma: PrismaService) { }


        async createTraveler(data: travelerDTO, file: Express.Multer.File) {
                const users = await this.prisma.user.findUnique({
                        where: {
                                id_user: data.user
                        }

                })
                const contacts = await this.prisma.contact.findUnique({
                        where: {
                                id_contact: data.contact
                        }
                })

                if (users && contacts) {
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
                                const response = await this.prisma.traveler.create({
                                        data: {
                                                image_link: data.image_link,
                                                image: file.buffer,
                                                user: user.id_user,
                                                contact: contact.id_contact
                                        }
                                })
                                
                                console.log("Traveler create sucefully!")
                                return response

                        } catch (error) {
                                console.error("Traveler already exists!")
                        }
                }
        }

        async allTravelers() {
                return this.prisma.traveler.findMany()
        }

        async updateTraveler(id_traveler: number, data: travelerDTO, file: Express.Multer.File) {

                const users = await this.prisma.traveler.findFirst({
                        where: {
                                user: data.user,
                                id_traveler: id_traveler
                        }

                })
                const contacts = await this.prisma.traveler.findFirst({
                        where: {
                                contact: data.contact,
                                id_traveler: id_traveler
                        }
                })

                if (!users && !contacts) {
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
                                const response = await this.prisma.traveler.update({
                                        data: {
                                                image_link: data.image_link,
                                                image: file.buffer,
                                                user: user.id_user,
                                                contact: contact.id_contact
                                        },

                                        where: {
                                                id_traveler,
                                        }
                                })

                                console.log('Update sucefully')
                                return response
                        }

                        catch { error } { console.log(error) }
                }
        }
}
