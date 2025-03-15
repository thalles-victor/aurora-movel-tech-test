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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ImageEntity } from 'src/Application/Entities/Image.entity';

@ApiTags('upload')
@Controller({ path: 'upload', version: '1' })
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RolesDecorator(ROLE.ROOT, ROLE.ADMIN)
  @ApiBearerAuth('jwt')
  @ApiOkResponse({ type: ImageEntity })
  @ApiOperation({
    summary: 'Fazer upload de uma imagem',
    description:
      'Permite que usuários com roles ROOT ou ADMIN façam upload de uma imagem. O arquivo deve ser enviado no campo "image" como multipart/form-data.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo de imagem a ser enviado',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo de imagem (ex.: .jpg, .png)',
        },
      },
      required: ['image'],
    },
  })
  @ApiOkResponse({
    description:
      'Imagem enviada com sucesso. Retorna os detalhes da imagem salva.',
    type: ImageEntity,
  })
  image(@UploadedFile(ImageValidationPipe) image: Express.Multer.File) {
    return this.uploadService.image(image);
  }
}
