import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { contactDTO } from 'src/module/Any.dto';

@Injectable()
export class ContactService {
    constructor ( private prisma: PrismaService){}

    async creatContact(data : contactDTO){
        try {
            return await this.prisma.contact.create({
                data,
            })
        } catch (error) {throw new error('Email already exists')}
    }
}
