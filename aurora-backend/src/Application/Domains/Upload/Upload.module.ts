import { Module } from '@nestjs/common';
import { UploadController } from './Upload.controller';
import { UploadService } from './Upload.service';
import { KEY_OF_INJECTION } from 'src/@shared/metadata';
import { ImageTypeormRepository } from 'src/Application/Infra/Repositories/Image/ImageTypeOrm.repository';
import { RepositoriesModule } from 'src/Application/Infra/Repositories/Repositories.module';
import { StorageModule } from 'src/Application/Infra/Storage/storage.module';

@Module({
  imports: [RepositoriesModule, StorageModule],
  controllers: [UploadController],
  providers: [
    {
      provide: KEY_OF_INJECTION.IMAGE_REPOSITORY,
      useClass: ImageTypeormRepository,
    },

    UploadService,
  ],
})
export class UploadModule {}
