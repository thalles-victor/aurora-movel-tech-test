import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(120)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
