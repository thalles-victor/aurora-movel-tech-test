import { CarEntity } from 'src/Application/Entities/Car.entity';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICarRepositoryContract } from './ICar.repository-contract';

@Injectable()
export class CarTypeormRepository implements ICarRepositoryContract {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async getBy(
    unqRef: Required<Pick<Pick<CarEntity, 'id'>, 'id'>> &
      Partial<Record<never, never>>,
  ): Promise<CarEntity | null> {
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
    unqRef: Required<Pick<Pick<CarEntity, 'id'>, 'id'>> &
      Partial<Record<never, never>>,
    updEntity: Partial<Pick<CarEntity, 'name' | 'brand'>>,
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

  async softDelete(
    unqRef: Required<Pick<Pick<CarEntity, 'id'>, 'id'>> &
      Partial<Record<never, never>>,
  ): Promise<CarEntity> {
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

  async delete(
    unqRef: Required<Pick<Pick<CarEntity, 'id'>, 'id'>> &
      Partial<Record<never, never>>,
  ): Promise<void> {
    try {
      await this.carRepository.delete({ id: unqRef.id });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
