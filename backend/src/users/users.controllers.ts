import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }
}
