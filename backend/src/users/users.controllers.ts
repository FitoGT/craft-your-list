import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) { }


  @Get()
  async list() {
    return this.users.findAll();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.users.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.users.delete(id);
  }
}
