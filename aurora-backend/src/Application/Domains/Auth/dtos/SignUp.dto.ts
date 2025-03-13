import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(120)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
