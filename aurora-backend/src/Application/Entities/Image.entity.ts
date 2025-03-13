import { TABLE } from 'src/@shared/metadata';
import { RequireOnlyOne } from 'src/@shared/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: TABLE.image })
export class ImageEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'varchar' })
  originalfilename: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar', length: 10 })
  provider: 'LOCAL' | 'S3';

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}

export type ImageUpdateEntity = Partial<Pick<ImageEntity, 'provider'>>;

export type ImageUniqueRefs = RequireOnlyOne<Pick<ImageEntity, 'id'>>;
