import { IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class createUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  password: string;
}
