import { Inject } from '@nestjs/common';
import { ENV } from 'src/@shared/env';
import { KEY_OF_INJECTION } from 'src/@shared/metadata';
import { generateRandomFileName, generateShortId } from 'src/@shared/utils';
import { IIMageRepositoryContract } from 'src/Application/Infra/Repositories/Image/IImage.repository-contract';
import { StorageService } from 'src/Application/Infra/Storage/storage-service';
import {} from 'uuid';

export class UploadService {
  constructor(
    @Inject(KEY_OF_INJECTION.IMAGE_REPOSITORY)
    private readonly imageRepository: IIMageRepositoryContract,
    private readonly storageService: StorageService,
  ) {}

  async image(image: Express.Multer.File) {
    const name = generateRandomFileName(image.originalname);

    const bucket = ENV.PUBLIC_IMAGES_BUCKET_NAME;

    const saveResult = await this.storageService.save(image, name, bucket);

    const imageCreated = await this.imageRepository.create({
      id: generateShortId(20),
      originalfilename: image.originalname,
      provider: saveResult.provider,
      url: saveResult.location,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return imageCreated;
  }
}
