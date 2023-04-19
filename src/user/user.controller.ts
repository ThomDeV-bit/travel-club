import { Body, Controller, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
import { userDTO } from 'src/module/Any.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post("/create")
  async createUser(@Body() data: userDTO) {
    return this.userService.createUser(data)
  }

  @Get("/findall/")
  async findAll() {
    return this.userService.findAll()
  }

  @Put("/update/:id")
  async updateUser(@Param("id", ParseIntPipe) id_user: number, @Body() data: userDTO) {
    return this.userService.updateUser(id_user, data)
  }

  @Delete("/:id")
  async deleteUser(@Param("id", ParseIntPipe) id_user: number) {
    return this.userService.deleteUser(id_user)
  }

}


