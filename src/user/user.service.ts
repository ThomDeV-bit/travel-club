import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { userDTO } from 'src/module/Any.dto';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }
    async createUser(data: userDTO) {
        try {
            console.log('User create sucefully')
            const user = await this.prisma.user.create({
                data,
            })
            return user;

        } catch (userExists) { throw new Error('User already exists!') }


    }

    async findAll() {
        return this.prisma.user.findMany()
    }



    async updateUser(id_user: number, data: userDTO) {
        try {
            console.log('User update sucefully')
            return await this.prisma.user.update({
                data,
                where: {
                    id_user,
                }
            })

        } catch (error) { throw new error('User does not exists') }

    }

    async deleteUser(id_user: number) {
        try {
            console.log('User delete sucefully')
            return await this.prisma.user.delete({
                where: {
                    id_user,
                }
            })

        } catch (error) { throw new error('User does not exists') }
    }
}