import * as path from 'node:path';
import * as fs from 'node:fs';

import { Injectable } from '@nestjs/common';
import { ENV } from 'src/@shared/env';
import { StorageSaveResult } from 'src/@shared/types';
import { StorageContract } from './storage-service';
import { checkIfFolderExistAndCreate } from 'src/@shared/utils';

@Injectable()
export class LocalStorageService implements StorageContract {
  constructor() {}

  async save(
    file: Express.Multer.File,
    name: string,
    bucket: string,
  ): Promise<StorageSaveResult> {
    const dir = checkIfFolderExistAndCreate(bucket);

    const filePath = path.join(dir, name);

    fs.writeFileSync(filePath, file.buffer);

    const result: StorageSaveResult = {
      bucket: bucket,
      etag: '',
      provider: 'LOCAL',
      key: name,
      location: `${ENV.BACKEND_PROTOCOL}://${ENV.BACKEND_DOMAIN}:${ENV.PORT}/static/assets/${ENV.PUBLIC_IMAGES_BUCKET_NAME}/${name}`,
    };

    return result;
  }
}
