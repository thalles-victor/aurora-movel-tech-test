import { Controller, Post, UploadedFile } from '@nestjs/common';
import { ImageValidationPipe } from './validators/image.validator';
import { UploadService } from './Upload.service';

@Controller({ path: 'controller', version: '1' })
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  image(@UploadedFile(ImageValidationPipe) image: Express.Multer.File) {
    return this.uploadService.image(image);
  }
}
