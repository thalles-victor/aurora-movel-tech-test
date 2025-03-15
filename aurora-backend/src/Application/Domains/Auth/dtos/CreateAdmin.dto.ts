import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    description:
      'Endereço de e-mail do administrador. Deve ser uma string não vazia e um e-mail válido.',
    example: 'admin@exemplo.com',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
