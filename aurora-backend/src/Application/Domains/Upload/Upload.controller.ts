import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageValidationPipe } from './validators/image.validator';
import { UploadService } from './Upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, RoleGuard } from 'src/@shared/guards';
import { ROLE } from 'src/@shared/metadata';
import { RolesDecorator } from 'src/@shared/decorators';

@Controller({ path: 'upload', version: '1' })
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RolesDecorator(ROLE.ROOT, ROLE.ADMIN)
  image(@UploadedFile(ImageValidationPipe) image: Express.Multer.File) {
    return this.uploadService.image(image);
  }
}
