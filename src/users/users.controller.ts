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
  UseGuards,
} from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { updatePutUserDTO } from './dto/update-put-user.dto';
import { updatePatchUserDTO } from './dto/update-patch-user.dto';
import { UsersService } from './users.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';

//Can be used globally here @UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
@Roles(Role.Admin, Role.Root)
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
