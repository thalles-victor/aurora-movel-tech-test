import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from 'src/Application/Entities/Brand.enitty';
import { CarEntity } from 'src/Application/Entities/Car.entity';
import { UserEntity } from 'src/Application/Entities/User.entity';
import { WYSIWYGEntity } from 'src/Application/Entities/WYSIWYG.entity';
import { UserTypeOrmRepository } from './User/UserTypeOrm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      BrandEntity,
      CarEntity,
      WYSIWYGEntity,
    ]),
  ],
  providers: [UserTypeOrmRepository],
  exports: [TypeOrmModule, UserTypeOrmRepository],
})
export class RepositoriesModule {}
