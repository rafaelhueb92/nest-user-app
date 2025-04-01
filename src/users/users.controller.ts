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
import { UsersService } from './users.service';
import { ParamId } from 'src/decorators/param-id.decorator';

//Can be used globally here @UseInterceptors(LogInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //@UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() body: createUserDTO) {
    return await this.userService.create(body);
  }

  @Get()
  async list() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id);
  }

  @Put(':id')
  async update(
    @Body() body: updatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.update(id, body);
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: updatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.updatePartial(id, body);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.userService.delete(id);
  }
}
