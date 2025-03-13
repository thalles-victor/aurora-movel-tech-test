import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/Application/Entities/Car.entity';
import { UserEntity } from 'src/Application/Entities/User.entity';
import { WYSIWYGEntity } from 'src/Application/Entities/WYSIWYG.entity';
import { UserTypeOrmRepository } from './User/UserTypeOrm.repository';
import { ImageEntity } from 'src/Application/Entities/Image.entity';
import { CarTypeormRepository } from './Car/CarTypeOrm.repository';
import { ImageTypeormRepository } from './Image/ImageTypeOrm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CarEntity,
      WYSIWYGEntity,
      ImageEntity,
    ]),
  ],
  providers: [
    UserTypeOrmRepository,
    CarTypeormRepository,
    ImageTypeormRepository,
  ],
  exports: [
    TypeOrmModule,
    UserTypeOrmRepository,
    CarTypeormRepository,
    ImageTypeormRepository,
  ],
})
export class RepositoriesModule {}
