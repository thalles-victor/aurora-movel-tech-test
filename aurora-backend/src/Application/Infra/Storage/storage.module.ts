import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage-service';
import { S3StorageService } from './s3-storage.sevice';

@Module({
  providers: [StorageService, LocalStorageService, S3StorageService],
  exports: [StorageService],
})
export class LocalStorageModule {}
