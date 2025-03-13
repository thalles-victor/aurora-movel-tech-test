import { ENV } from 'src/@shared/env';
import { generateRandomFileName } from 'src/@shared/utils';
import { StorageService } from 'src/Application/Infra/Storage/storage-service';

export class UploadService {
  constructor(private readonly storageService: StorageService) {}

  async image(image: Express.Multer.File) {
    const name = generateRandomFileName(image.originalname);

    const bucket = ENV.PUBLIC_IMAGES_BUCKET_NAME;

    const saveResult = await this.storageService.save(image, name, bucket);

    return saveResult;
  }
}
