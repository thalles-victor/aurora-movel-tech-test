import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const oneKb = 5000;
    if (!value.mimetype.startsWith('image/')) {
      throw new BadRequestException('only image in this method');
    }

    if (value.size > oneKb * 100) {
      throw new BadRequestException('image more 80kb');
    }

    // "value" is an object containing the file's attributes and metadata
    return value;
  }
}
