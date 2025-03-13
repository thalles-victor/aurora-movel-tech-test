import { Injectable, NotImplementedException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { StorageSaveResult } from 'src/@shared/types';
import { StorageContract } from './storage-service';
import { ENV } from 'src/@shared/env';

@Injectable()
export class S3StorageService implements StorageContract {
  private readonly S3 = new AWS.S3({
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
  });

  constructor() {}

  async save(
    file: Express.Multer.File,
    name: string,
    bucket: string,
  ): Promise<StorageSaveResult> {
    const uploadParams = {
      Bucket: bucket,
      Key: name,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      ACL: 'public-read',
    };

    const s3Response = await this.S3.upload(uploadParams).promise();

    return {
      key: s3Response.Key,
      bucket: s3Response.Bucket,
      etag: s3Response.ETag,
      location: s3Response.Location,
      provider: 'S3',
    };
  }
}
