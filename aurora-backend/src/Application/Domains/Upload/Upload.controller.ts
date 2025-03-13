import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageValidationPipe } from './validators/image.validator';
import { UploadService } from './Upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller({ path: 'upload', version: '1' })
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  image(@UploadedFile(ImageValidationPipe) image: Express.Multer.File) {
    return this.uploadService.image(image);
  }
}
