import { TABLE } from 'src/@shared/metadata';
import { RequireOnlyOne } from 'src/@shared/types';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**Criar crud de veículos com os seguintes atributos (id, placa, chassi, renavam, modelo, marca, ano */
@Entity({ name: TABLE.car })
export class CarEntity {
  @ApiProperty({
    description:
      'Identificador único do veículo. Deve ser uma string de até 40 caracteres.',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    required: true,
  })
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @ApiProperty({
    description: 'Placa do veículo. Deve ser uma string de até 20 caracteres.',
    example: 'ABC-1234',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar', length: 20 })
  licensePlate: string; // placa

  @ApiProperty({
    description:
      'Número do chassi do veículo. Deve ser uma string de até 40 caracteres.',
    example: '9BWZZZ377HP654321',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar', length: 40 })
  chassis: string; // chassi

  @ApiProperty({
    description:
      'Número do RENAVAM do veículo. Deve ser uma string de até 40 caracteres.',
    example: '12345678901',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar', length: 40 })
  registrationNumber: string; // renavam

  @ApiProperty({
    description: 'Modelo do veículo. Deve ser uma string de até 40 caracteres.',
    example: 'Gol',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar', length: 40 })
  model: string; // modelo

  @ApiProperty({
    description: 'Marca do veículo. Deve ser uma string de até 40 caracteres.',
    example: 'Volkswagen',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar', length: 40 })
  brand: string; // marca

  @ApiProperty({
    description: 'Ano do veículo. Deve ser uma string de 4 caracteres.',
    example: '2020',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar', length: 4 })
  year: string; // ano

  @ApiProperty({
    description: 'URL da imagem do veículo. Pode ser nulo.',
    example: 'https://example.com/car-image.jpg',
    type: String,
    required: false,
  })
  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @ApiProperty({
    description: 'Identificador WYSIWYG associado ao veículo. Pode ser nulo.',
    example: 'wysiwyg-123',
    type: String,
    required: false,
  })
  @Column({ type: 'varchar', length: 40, nullable: true, default: null })
  WYSIWYGId: string | null;

  @ApiProperty({
    description: 'Data de exclusão lógica do veículo. Pode ser nulo.',
    example: '2023-10-15T12:00:00Z',
    type: String,
    format: 'date-time',
    required: false,
  })
  @Column({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date | null;

  @ApiProperty({
    description: 'Data de criação do registro do veículo.',
    example: '2023-01-01T10:00:00Z',
    type: String,
    format: 'date-time',
    required: true,
  })
  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro do veículo.',
    example: '2023-01-02T15:30:00Z',
    type: String,
    format: 'date-time',
    required: true,
  })
  @Column({ type: 'timestamptz' })
  updateAt: Date;
}

export type CarUpdateEntity = Partial<
  Pick<CarEntity, 'model' | 'brand' | 'year' | 'imageUrl'>
> &
  Pick<CarEntity, 'updateAt'>;

export type CarUniqueRefs = RequireOnlyOne<
  Pick<CarEntity, 'id' | 'licensePlate' | 'chassis' | 'registrationNumber'>
>;
