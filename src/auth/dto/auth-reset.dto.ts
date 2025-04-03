import { IsJWT, IsString, MinLength } from 'class-validator';

export class AuthReseetDTO {
  @IsString()
  @MinLength(6)
  password: string;

  @IsJWT()
  token: string;
}
