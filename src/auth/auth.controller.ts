import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisternDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthReseetDTO } from './dto/auth-reset.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '../decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { createPath } from './utils/create-path.utils';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisternDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return await this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthReseetDTO) {
    return await this.authService.reset(password, token);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@User('email') user) {
    return {
      user,
    };
  }

  // Also use FileFieldsInterceptor and FilesInterceptor

  // Use FilePipeInterceptor
  @UseInterceptors(FileInterceptor('file'))
  @Post('photo')
  @UseGuards(AuthGuard)
  async uploadPhoto(@User() user, @UploadedFile() photo: Express.Multer.File) {
    const storageFolder = await createPath(['storage', 'photos']);

    const result = await writeFile(
      join(storageFolder, `photo-${user.id}.png`),
      photo.buffer,
    );

    return {
      result,
    };
  }
}
