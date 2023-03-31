import { Injectable } from '@nestjs/common';
import { traveler, user } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { travelerDTO } from 'src/module/Any.dto';

@Injectable()
export class TravelerService {
        constructor(private prisma: PrismaService) { }

        async createTraveler(data: travelerDTO) {
                try {
                        console.log('Traveler create sucefully')
                        return await this.prisma.traveler.create({
                                data,
                        })

                } catch (error) { throw new error('User already exists') }
        }

        async allTravelers(){
                return this.prisma.traveler.findMany()
        }



        async updateTraveler(id_traveler : number, data:  travelerDTO)
}
