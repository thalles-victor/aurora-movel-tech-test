import { TABLE } from 'src/@shared/metadata';
import { RequireOnlyOne } from 'src/@shared/types';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

/**Criar crud de veículos com os seguintes atributos (id, placa, chassi, renavam, modelo, marca, ano */

@Entity({ name: TABLE.car })
export class CarEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  licensePlate: string; // placa

  @Column({ type: 'varchar', length: 40, unique: true })
  chassis: string; // chassi

  @Column({ type: 'varchar', length: 40, unique: true })
  registrationNumber: string; //renovam

  @Column({ type: 'varchar', length: 40 })
  model: string; // modelo

  @Column({ type: 'varchar', length: 40 })
  brand: string; // marca

  @Column({ type: 'varchar', length: 4 })
  year: string; // ano

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column({ type: 'varchar', length: 40, nullable: true, default: null })
  WYSIWYGId: string | null;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date | null;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updateAt: Date;
}

export type CarUpdateEntity = Partial<
  Pick<CarEntity, 'model' | 'brand' | 'year' | 'imageUrl'>
>;

export type CarUniqueRefs = RequireOnlyOne<
  Pick<CarEntity, 'id' | 'licensePlate' | 'chassis' | 'registrationNumber'>
>;
