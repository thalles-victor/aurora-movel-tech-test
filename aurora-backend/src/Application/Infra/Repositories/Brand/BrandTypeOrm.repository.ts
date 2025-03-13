import {
  BrandEntity,
  BrandUpdateEntity,
} from 'src/Application/Entities/Brand.enitty';
import { IBrandRepositoryContract } from './IBrand.repository-contract';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { splitKeyAndValue } from 'src/@shared/utils';

@Injectable()
export class BrandTypeOrmRepository implements IBrandRepositoryContract {
  constructor(private readonly brandRepository: Repository<BrandEntity>) {}

  async getBy(
    unqRef: Partial<Pick<BrandEntity, 'id' | 'name'>>,
  ): Promise<BrandEntity | null> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      const brand = await this.brandRepository.findOne({
        where: { [key]: value },
      });

      return brand ?? null;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async create(entity: BrandEntity): Promise<BrandEntity> {
    try {
      const queryBuilder = this.brandRepository.createQueryBuilder();

      const result = (
        await queryBuilder
          .insert()
          .into(BrandEntity)
          .values([{ ...entity }])
          .returning('*')
          .execute()
      ).raw;

      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async update(
    unqRef: Partial<Pick<BrandEntity, 'id' | 'name'>>,
    updEntity: BrandUpdateEntity,
  ): Promise<BrandEntity> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      const queryBuilder = this.brandRepository.createQueryBuilder();

      const result = (
        await queryBuilder
          .update(BrandEntity)
          .set(updEntity)
          .where(`${key} = :${key}`, { [key]: value })
          .execute()
      ).raw;

      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async softDelete(
    unqRef: Partial<Pick<BrandEntity, 'id' | 'name'>>,
  ): Promise<BrandEntity> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      const queryBuilder = this.brandRepository.createQueryBuilder();

      const result = (
        await queryBuilder
          .update(BrandEntity)
          .set({ deletedAt: new Date() })
          .where(`${key} = :${key}`, { [key]: value })
          .execute()
      ).raw;

      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async delete(
    unqRef: Partial<Pick<BrandEntity, 'id' | 'name'>>,
  ): Promise<void> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      await this.brandRepository.delete({ [key]: value });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
