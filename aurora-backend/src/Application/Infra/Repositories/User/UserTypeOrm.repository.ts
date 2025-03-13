import {
  UserEntity,
  UserUniqueRefs,
  UserUpdateEntity,
} from 'src/Application/Entities/User.entity';
import { IUserRepositoryContract } from './User.repository-contract';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { splitKeyAndValue } from 'src/@shared/utils';

@Injectable()
export class UserTypeOrmRepository implements IUserRepositoryContract {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  async getBy(unqRef: UserUniqueRefs): Promise<UserEntity | null> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      const user = await this.userRepository.findOne({
        where: { [key]: value },
      });

      return user ?? null;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder();

      const result = (
        await queryBuilder
          .insert()
          .into(UserEntity)
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
    unqRef: Partial<Pick<UserEntity, 'id' | 'email'>>,
    updEntity: UserUpdateEntity,
  ): Promise<UserEntity> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      const queryBuilder = this.userRepository.createQueryBuilder();

      const result = (
        await queryBuilder
          .update(UserEntity)
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
    unqRef: Partial<Pick<UserEntity, 'id' | 'email'>>,
  ): Promise<UserEntity> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      const queryBuilder = this.userRepository.createQueryBuilder();

      const result = (
        await queryBuilder
          .update(UserEntity)
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
    unqRef: Partial<Pick<UserEntity, 'id' | 'email'>>,
  ): Promise<void> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      await this.userRepository.delete({ [key]: value });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
