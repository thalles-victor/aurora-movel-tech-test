import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ImageEntity,
  ImageUniqueRefs,
  ImageUpdateEntity,
} from 'src/Application/Entities/Image.entity';
import { IIMageRepositoryContract } from './IImage.repository-contract';

@Injectable()
export class ImageTypeormRepository implements IIMageRepositoryContract {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async getBy(unqRef: ImageUniqueRefs): Promise<ImageEntity | null> {
    try {
      const image = await this.imageRepository.findOne({
        where: { id: unqRef.id },
      });
      return image ?? null;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Failed to fetch image');
    }
  }

  async create(entity: ImageEntity): Promise<ImageEntity> {
    try {
      const queryBuilder = this.imageRepository.createQueryBuilder();
      const result = (
        await queryBuilder
          .insert()
          .into(ImageEntity)
          .values([{ ...entity }])
          .returning('*')
          .execute()
      ).raw[0];
      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Failed to create image');
    }
  }

  async update(
    unqRef: ImageUniqueRefs,
    updEntity: ImageUpdateEntity,
  ): Promise<ImageEntity> {
    try {
      const queryBuilder = this.imageRepository.createQueryBuilder();
      const result = (
        await queryBuilder
          .update(ImageEntity)
          .set(updEntity)
          .where('id = :id', { id: unqRef.id })
          .returning('*')
          .execute()
      ).raw[0];
      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Failed to update image');
    }
  }

  async softDelete(unqRef: ImageUniqueRefs): Promise<ImageEntity> {
    try {
      const queryBuilder = this.imageRepository.createQueryBuilder();
      const result = (
        await queryBuilder
          .update(ImageEntity)
          .set({ deletedAt: new Date() })
          .where('id = :id', { id: unqRef.id })
          .returning('*')
          .execute()
      ).raw[0];
      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Failed to soft delete image');
    }
  }

  async delete(unqRef: ImageUniqueRefs): Promise<void> {
    try {
      await this.imageRepository.delete({ id: unqRef.id });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Failed to delete image');
    }
  }
}
