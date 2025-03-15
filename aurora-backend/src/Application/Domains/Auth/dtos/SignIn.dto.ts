import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(120)
  @ApiProperty({ type: String, required: true, example: 'jhon@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, example: 'MyPassword123' })
  password: string;
}
