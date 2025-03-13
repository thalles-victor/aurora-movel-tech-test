import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { KEY_OF_INJECTION } from 'src/@shared/metadata';
import { ICarRepositoryContract } from 'src/Application/Infra/Repositories/Car/ICar.repository-contract';
import { CreateCarDto } from './dtos/CreateCar.dto';
import * as uuid from 'uuid';

@Injectable()
export class CarService {
  constructor(
    @Inject(KEY_OF_INJECTION.CAR_REPOSITORY)
    private readonly carRepository: ICarRepositoryContract,
  ) {}

  async create(createCardDto: CreateCarDto) {
    const licenseInUse = await this.carRepository.getBy({
      licensePlate: createCardDto.licensePlate,
    });

    if (licenseInUse) {
      throw new ConflictException('license in use');
    }

    const chassisInUse = await this.carRepository.getBy({
      chassis: createCardDto.chassis,
    });

    if (chassisInUse) {
      throw new ConflictException('chassis in use');
    }

    const registrationNumberInUse = await this.carRepository.getBy({
      registrationNumber: createCardDto.registrationNumber,
    });

    if (registrationNumberInUse) {
      throw new ConflictException('registrationNumber in use');
    }

    const carCreated = await this.carRepository.create({
      id: uuid.v7(),
      brand: createCardDto.brand,
      chassis: createCardDto.chassis,
      licensePlate: createCardDto.licensePlate,
      model: createCardDto.model,
      registrationNumber: createCardDto.registrationNumber,
      year: createCardDto.year,
      imageUrl: createCardDto.imageUrl ?? null,
      updateAt: new Date(),
      WYSIWYGId: null,
      deletedAt: null,
      createdAt: new Date(),
    });

    return carCreated;
  }

  async getGetAllCarsNonDeleted() {
    const cars = await this.carRepository.getAllUndeletedCars();

    return cars;
  }
}
