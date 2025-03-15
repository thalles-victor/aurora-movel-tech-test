import { ROLE, TABLE } from 'src/@shared/metadata';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: TABLE.user })
export class UserEntity {
  @ApiProperty({
    description:
      'Identificador único do usuário. Deve ser uma string de até 40 caracteres.',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    required: true,
  })
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @ApiProperty({
    description: 'Nome do usuário. Deve ser uma string de até 40 caracteres.',
    example: 'João Silva',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar', length: 40 })
  name: string;

  @ApiProperty({
    description:
      'Endereço de e-mail do usuário. Deve ser uma string de até 120 caracteres.',
    example: 'joao.silva@email.com',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar', length: 120 })
  @Index()
  email: string;

  @ApiProperty({
    description:
      'Lista de papéis (roles) atribuídos ao usuário. Deve ser um array de valores do enum ROLE.',
    example: ['USER', 'ADMIN'],
    type: [String],
    enum: ROLE,
    required: true,
  })
  @Column({ type: 'varchar', array: true, enum: ROLE, length: 20 })
  roles: ROLE[];

  @ApiHideProperty()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty({
    description: 'Data de exclusão lógica do usuário. Pode ser nulo.',
    example: '2023-10-15T12:00:00Z',
    type: String,
    format: 'date-time',
    required: false,
  })
  @Column({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date | null;

  @ApiProperty({
    description: 'Data de criação do registro do usuário.',
    example: '2023-01-01T10:00:00Z',
    type: String,
    format: 'date-time',
    required: true,
  })
  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro do usuário.',
    example: '2023-01-02T15:30:00Z',
    type: String,
    format: 'date-time',
    required: true,
  })
  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}

export type UserUpdateEntity = Partial<
  Pick<UserEntity, 'name' | 'roles' | 'password' | 'deletedAt'>
> &
  Pick<UserEntity, 'updatedAt'>;

export type UserUniqueRefs = Partial<Pick<UserEntity, 'id' | 'email'>>;
