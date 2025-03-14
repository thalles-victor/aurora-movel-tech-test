import {
  ConflictException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { KEY_OF_INJECTION } from 'src/@shared/metadata';
import { ICarRepositoryContract } from 'src/Application/Infra/Repositories/Car/ICar.repository-contract';
import { CreateCarDto } from './dtos/CreateCar.dto';
import * as uuid from 'uuid';
import { UpdateCarDto } from './dtos/UpdateCar.dto';

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

    if (licenseInUse && !licenseInUse.deletedAt) {
      throw new ConflictException('license in use');
    }

    const chassisInUse = await this.carRepository.getBy({
      chassis: createCardDto.chassis,
    });

    if (chassisInUse && !chassisInUse.deletedAt) {
      throw new ConflictException('chassis in use');
    }

    const registrationNumberInUse = await this.carRepository.getBy({
      registrationNumber: createCardDto.registrationNumber,
    });

    if (registrationNumberInUse && !registrationNumberInUse.deletedAt) {
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

  async softDeleteCar(id: string) {
    const carExist = await this.carRepository.getBy({ id });

    if (!carExist) {
      throw new NotFoundException('car not exist');
    }

    if (carExist.deletedAt) {
      throw new NotAcceptableException('car already deleted');
    }

    const carDeleted = await this.carRepository.softDelete({ id });

    return carDeleted;
  }

  async permanentlyDelete(id: string) {
    const carExist = await this.carRepository.getBy({ id });

    if (!carExist) {
      throw new NotFoundException('car not exist');
    }

    const carDeleted = await this.carRepository.delete({ id });

    return carDeleted;
  }

  async updateCar(carDto: UpdateCarDto) {
    const carExist = await this.carRepository.getBy({ id: carDto.carId });

    if (!carExist) {
      throw new NotFoundException('car not exist');
    }

    const carUpdated = await this.carRepository.update(
      {
        id: carDto.carId,
      },
      {
        brand: carDto.brand ?? undefined,
        imageUrl: carDto.imageUrl,
        model: carDto.model,
        year: carDto.year,
        updateAt: new Date(),
      },
    );

    return carUpdated;
  }

  async getById(carId: string) {
    const car = await this.carRepository.getBy({ id: carId });

    if (!car) {
      throw new NotFoundException('car not exist');
    }

    return car;
  }
}
