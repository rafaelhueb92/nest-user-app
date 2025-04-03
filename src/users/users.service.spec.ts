import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from './mocks/prisma.service.mock';
import * as bcrypt from 'bcrypt';
import { createUserDTO } from './dto/create-user.dto';

describe('Testing User', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: createUserDTO = {
      name: 'testuser',
      email: 'test@test.com',
      password: 'testpass',
      role: 1,
      birthAt: '1991-03-01',
    };

    prismaMock.user.create.mockResolvedValue({
      id: 1,
      email: dto.email,
      password: 'hashedpassword', // Simulate hashed password
    });

    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve('hashedpassword'));

    const result = await service.create(dto);
    expect(result).toEqual({
      id: 1,
      email: dto.email,
      password: 'hashedpassword',
    });

    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: { ...dto, password: 'hashedpassword' },
    });
  });
});
