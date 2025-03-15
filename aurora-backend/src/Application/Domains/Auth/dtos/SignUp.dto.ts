import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description:
      'Nome do usuário para cadastro. Deve ser uma string não vazia com no máximo 20 caracteres.',
    example: 'João Silva',
    type: String,
    maxLength: 20,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    description:
      'Endereço de e-mail do usuário. Deve ser um e-mail válido com no máximo 120 caracteres.',
    example: 'joao.silva@email.com',
    type: String,
    maxLength: 120,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(120)
  email: string;

  @ApiProperty({
    description: 'Senha do usuário. Deve ser uma string não vazia.',
    example: 'senha123',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
