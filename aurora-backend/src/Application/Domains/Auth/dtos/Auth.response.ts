import { UserEntity } from 'src/Application/Entities/User.entity';
import { ApiProperty } from '@nestjs/swagger';

class AccessToken {
  @ApiProperty({
    description: 'Token de acesso JWT gerado para autenticação do usuário.',
    example: 'eyJhbGciOiJI...',
    type: String,
    required: true,
  })
  token: string;

  @ApiProperty({
    description:
      'Tempo de expiração do token de acesso, representado como uma string (ex.: "24h" para 24 horas).',
    example: '1y',
    type: String,
    required: true,
  })
  expiresIn: string;
}

export class AuthResponse {
  @ApiProperty({
    description: 'Dados do usuário autenticado.',
    type: () => UserEntity,
    required: true,
  })
  user: UserEntity;

  @ApiProperty({
    description: 'Informações do token de acesso gerado para o usuário.',
    type: () => AccessToken,
    required: true,
  })
  accessToken: AccessToken;
}
