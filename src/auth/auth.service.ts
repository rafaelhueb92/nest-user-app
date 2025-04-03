import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AuthRegisternDTO } from './dto/auth-register.dto';
import { MailerService } from '@nestjs-modules/mailer/dist';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Email or password incorrect!');

    if (user.role == 3 && password == user.password) {
      return this.createToken(user);
    } else if (!(await bcrypt.compare(password, user.password || '')))
      throw new UnauthorizedException('Email or password incorrect!');

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Email or password incorrect!');

    const token = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'login',
        audience: 'users',
      },
    );

    await this.mailerService.sendMail({
      subject: `Password Recovery`,
      to: email,
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });

    return;
  }

  async reset(password: string, token: string) {
    const data = await this.checkToken(token);

    if (!data && isNaN(data.id)) {
      throw new BadRequestException('Invalid Toke!');
    }

    const user = await this.userService.updatePartial(data.id, {
      password,
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisternDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
