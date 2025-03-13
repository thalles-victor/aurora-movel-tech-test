import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ImageEntity,
  ImageUniqueRefs,
  ImageUpdateEntity,
} from 'src/Application/Entities/Image.entity';
import { IIMageRepositoryContract } from './IImage.repository-contract';

@Injectable()
export class ImageInMemoryRepository implements IIMageRepositoryContract {
  private images: ImageEntity[] = [];

  async getBy(unqRef: ImageUniqueRefs): Promise<ImageEntity | null> {
    const image = this.images.find((img) => img.id === unqRef.id);
    return image ?? null;
  }

  async create(entity: ImageEntity): Promise<ImageEntity> {
    const newImage = { ...entity };
    this.images.push(newImage);
    return newImage;
  }

  async update(
    unqRef: ImageUniqueRefs,
    updEntity: ImageUpdateEntity,
  ): Promise<ImageEntity> {
    const imageIndex = this.images.findIndex((img) => img.id === unqRef.id);

    if (imageIndex === -1) {
      throw new NotFoundException(`Image with id '${unqRef.id}' not found`);
    }

    const updatedImage = { ...this.images[imageIndex], ...updEntity };
    this.images[imageIndex] = updatedImage;
    return updatedImage;
  }

  async softDelete(unqRef: ImageUniqueRefs): Promise<ImageEntity> {
    const imageIndex = this.images.findIndex((img) => img.id === unqRef.id);

    if (imageIndex === -1) {
      throw new NotFoundException(`Image with id '${unqRef.id}' not found`);
    }

    const updatedImage = { ...this.images[imageIndex], deletedAt: new Date() };
    this.images[imageIndex] = updatedImage;
    return updatedImage;
  }

  async delete(unqRef: ImageUniqueRefs): Promise<void> {
    const imageIndex = this.images.findIndex((img) => img.id === unqRef.id);

    if (imageIndex === -1) {
      throw new NotFoundException(`Image with id '${unqRef.id}' not found`);
    }

    this.images.splice(imageIndex, 1);
  }

  clear(): void {
    this.images = [];
  }
}
