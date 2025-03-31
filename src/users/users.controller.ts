import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { updatePutUserDTO } from './dto/update-put-user.dto';
import { updatePatchUserDTO } from './dto/update-patch-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  async create(@Body() body: createUserDTO) {
    console.log(body);
    return body;
  }

  @Get()
  async list() {
    return { user: [] };
  }

  @Get(':id')
  async show(@Param() { id }) {
    return { id: Number(id) };
  }

  @Put(':id')
  async update(@Body() body: updatePutUserDTO, @Param() params) {
    return {
      method: 'put',
      body,
      params,
    };
  }

  @Patch(':id')
  async updatePartial(@Body() body: updatePatchUserDTO, @Param() params) {
    return {
      method: 'patch',
      body,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { excluded: Number(id) };
  }
}
