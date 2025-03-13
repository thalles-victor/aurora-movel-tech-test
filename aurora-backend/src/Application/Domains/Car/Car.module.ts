import { Module } from '@nestjs/common';
import { CarController } from './Car.controller';
import { CarService } from './Car.service';
import { RepositoriesModule } from 'src/Application/Infra/Repositories/Repositories.module';
import { KEY_OF_INJECTION } from 'src/@shared/metadata';
import { CarTypeormRepository } from 'src/Application/Infra/Repositories/Car/CarTypeOrm.repository';

@Module({
  imports: [RepositoriesModule],
  controllers: [CarController],
  providers: [
    {
      provide: KEY_OF_INJECTION.CAR_REPOSITORY,
      useClass: CarTypeormRepository,
    },
    CarService,
  ],
})
export class CarModule {}
