import { TABLE } from 'src/@shared/metadata';
import { RequireOnlyOne } from 'src/@shared/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: TABLE.image })
export class ImageEntity {
  @ApiProperty({
    description:
      'Identificador único da imagem. Deve ser uma string de até 40 caracteres.',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    required: true,
  })
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @ApiProperty({
    description: 'Nome original do arquivo da imagem.',
    example: 'carro-foto.jpg',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar' })
  originalfilename: string;

  @ApiProperty({
    description: 'URL de acesso à imagem.',
    example: 'https://example.com/images/carro-foto.jpg',
    type: String,
    required: true,
  })
  @Column({ type: 'varchar' })
  url: string;

  @ApiProperty({
    description:
      'Provedor de armazenamento da imagem. Deve ser "LOCAL" ou "S3".',
    example: 'S3',
    enum: ['LOCAL', 'S3'],
    type: String,
    required: true,
  })
  @Column({ type: 'varchar', length: 10 })
  provider: 'LOCAL' | 'S3';

  @ApiProperty({
    description: 'Data de exclusão lógica da imagem. Pode ser nulo.',
    example: '2023-10-15T12:00:00Z',
    type: String,
    format: 'date-time',
    required: false,
  })
  @Column({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date | null;

  @ApiProperty({
    description: 'Data de criação do registro da imagem.',
    example: '2023-01-01T10:00:00Z',
    type: String,
    format: 'date-time',
    required: true,
  })
  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro da imagem.',
    example: '2023-01-02T15:30:00Z',
    type: String,
    format: 'date-time',
    required: true,
  })
  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}

export type ImageUpdateEntity = Partial<Pick<ImageEntity, 'provider'>>;

export type ImageUniqueRefs = RequireOnlyOne<Pick<ImageEntity, 'id'>>;
