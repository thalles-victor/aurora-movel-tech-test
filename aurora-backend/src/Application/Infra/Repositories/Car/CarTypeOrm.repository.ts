import {
  CarEntity,
  CarUniqueRefs,
  CarUpdateEntity,
} from 'src/Application/Entities/Car.entity';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICarRepositoryContract } from './ICar.repository-contract';
import { TABLE } from 'src/@shared/metadata';

@Injectable()
export class CarTypeormRepository implements ICarRepositoryContract {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async getBy(unqRef: CarUniqueRefs): Promise<CarEntity | null> {
    try {
      const car = await this.carRepository.findOne({
        where: { id: unqRef.id },
      });

      return car ?? null;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async create(entity: CarEntity): Promise<CarEntity> {
    try {
      const queryBuilder = this.carRepository.createQueryBuilder();

      const result = (
        await queryBuilder
          .insert()
          .into(CarEntity)
          .values([{ ...entity }])
          .returning('*')
          .execute()
      ).raw[0];

      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async update(
    unqRef: CarUniqueRefs,
    updEntity: CarUpdateEntity,
  ): Promise<CarEntity> {
    try {
      const queryBuilder = this.carRepository.createQueryBuilder();

      const result = (
        await queryBuilder
          .update(CarEntity)
          .set(updEntity)
          .where('id = :id', { id: unqRef.id })
          .returning('*')
          .execute()
      ).raw[0];

      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async softDelete(unqRef: CarUniqueRefs): Promise<CarEntity> {
    try {
      const queryBuilder = this.carRepository.createQueryBuilder();

      const result = (
        await queryBuilder
          .update(CarEntity)
          .set({ deletedAt: new Date() })
          .where('id = :id', { id: unqRef.id })
          .returning('*')
          .execute()
      ).raw[0];

      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async delete(unqRef: CarUniqueRefs): Promise<void> {
    try {
      await this.carRepository.delete({ id: unqRef.id });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async getAllUndeletedCars(): Promise<CarEntity[]> {
    const query = `SELECT * FROM ${TABLE.car} WHERE "deletedAt" IS NULL`;

    const result = await this.carRepository.query(query);

    return result;
  }
}
