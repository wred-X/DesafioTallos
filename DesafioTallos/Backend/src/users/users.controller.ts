/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './shared/users.service';
import { Users } from './shared/users';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<Users[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Users> {
    return this.usersService.getById(id);
  }

  @Post()
  async create(@Body() users: Users): Promise<Users> {
    return this.usersService.create(users);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() users: Users): Promise<Users> {
    return this.usersService.update(id, users);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.usersService.delete(id);
  }
}
