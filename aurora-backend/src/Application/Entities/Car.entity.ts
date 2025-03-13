import { TABLE } from 'src/@shared/metadata';
import { RequireOnlyOne } from 'src/@shared/types';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

/**Criar crud de veículos com os seguintes atributos (id, placa, chassi, renavam, modelo, marca, ano */

@Entity({ name: TABLE.car })
export class CarEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'varchar', length: 20 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 40 })
  shortDescription: string;

  @Column({ type: 'varchar', length: 40 })
  brand: string;

  @Column({ type: 'varchar', length: 40 })
  WYSIWYGId: string;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date | null;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updateAt: Date;
}

export type CarUpdateEntity = Partial<Pick<CarEntity, 'name' | 'brand'>>;

export type CarUniqueRefs = RequireOnlyOne<Pick<CarEntity, 'id'>>;
