import { TABLE } from 'src/@shared/metadata';
import { Column, Entity, Index, PrimaryColumn, Table } from 'typeorm';

@Entity({ name: TABLE.brand })
export class BrandEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'varchar', unique: true })
  @Index()
  name: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date | null;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}

export type BrandUpdateEntity = Partial<
  Pick<BrandEntity, 'imageUrl' | 'deletedAt'>
> &
  Pick<BrandEntity, 'updatedAt'>;

export type BrandUniqueRefs = Partial<Pick<BrandEntity, 'id' | 'name'>>;
