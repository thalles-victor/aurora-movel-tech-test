import { ROLE, TABLE } from 'src/@shared/metadata';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: TABLE.user })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @Column({ type: 'varchar', length: 120 })
  @Index()
  email: string;

  @Column({ type: 'varchar', array: true, enum: ROLE, length: 20 })
  roles: ROLE[];

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date | null;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}

export type UserUpdateEntity = Partial<
  Pick<UserEntity, 'name' | 'roles' | 'password' | 'deletedAt'>
> &
  Pick<UserEntity, 'updatedAt'>;

export type UserUniqueRefs = Partial<Pick<UserEntity, 'id' | 'email'>>;
