import { TABLE } from 'src/@shared/metadata';
import { RequireOnlyOne } from 'src/@shared/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: TABLE.WYSIWYG })
export class WYSIWYGEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'bytea' })
  value: Buffer;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updateAt: Date;
}

export type WYSIWYGUpdateEntity = Partial<Pick<WYSIWYGEntity, 'value'>> &
  Pick<WYSIWYGEntity, 'updateAt'>;

export type WYSIWYGUniqueRefs = RequireOnlyOne<Pick<WYSIWYGEntity, 'id'>>;
