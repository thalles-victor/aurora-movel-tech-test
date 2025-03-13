import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { LocalStorageService } from './local-storage.service';
import { StorageSaveResult } from 'src/@shared/types';
import { S3StorageService } from './s3-storage.sevice';
import { ENV } from 'src/@shared/env';

export interface StorageContract {
  save(
    file: Express.Multer.File,
    name: string,
    bucket: string,
  ): Promise<StorageSaveResult>;
}

@Injectable()
export class StorageService {
  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly s3StorageService: S3StorageService,
  ) {}

  async save(file: Express.Multer.File, name: string, bucket: string) {
    if (ENV.STORAGE_PROVIDER === 'LOCAL') {
      const result = await this.localStorage.save(file, name, bucket);

      return result;
    }

    if (ENV.STORAGE_PROVIDER === 'S3') {
      const result = await this.s3StorageService.save(file, name, bucket);

      return result;
    }

    throw new InternalServerErrorException('storage provider is invalid');
  }
}
