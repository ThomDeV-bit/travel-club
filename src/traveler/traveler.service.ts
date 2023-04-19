import { Injectable , ArgumentMetadata , PipeTransform} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { travelerDTO, userDTO } from 'src/module/Any.dto';
import { UserService } from 'src/User/user.service';
import { ContactService } from 'src/contact/contact.service';
import { blob, buffer } from 'stream/consumers';

@Injectable()
export class TravelerService implements PipeTransform{
        constructor(private prisma: PrismaService ) { }
        transform(value: any, metadata: ArgumentMetadata) {
                throw new Error('Method not implemented.');
        }

        async createTraveler(data: travelerDTO) {
                try {
                        const user = await this.prisma.user.findFirst({
                                where: {
                                        id_user: data.user,
                                }
                        })
                        const contact = await this.prisma.contact.findFirst({
                                where:{
                                        id_contact : data.contact
                                }
                        })

                        console.log('Traveler create sucefully')

                        return await this.prisma.traveler.create({
                                data: {
                                        image_link: data.image_link,
                                        image: blob.apply(buffer),
                                        user : user.id_user,
                                        contact: contact.id_contact
                                }
                        })

                } catch (error) { throw new Error(error) }
        }

        async allTravelers() {
                return this.prisma.traveler.findMany()
        }



        async updateTraveler(id_traveler: number, data: travelerDTO) {
                try {
                        const user = await this.prisma.user.findUnique({
                                where: {
                                        id_user: data.user,
                                }
                        })
                        const contact = await this.prisma.contact.findUnique({
                                where:{
                                        id_contact : data.contact
                                }
                        })


                return this.prisma.traveler.update({
                        data: {
                                image_link: data.image_link,
                                image: blob.apply(buffer),
                                user : user.id_user,
                                contact: contact.id_contact
                        },
                        where : {
                                id_traveler,
                        }
                        
                })
        } catch (error) { throw new Error('User already exists') }

        }
}
