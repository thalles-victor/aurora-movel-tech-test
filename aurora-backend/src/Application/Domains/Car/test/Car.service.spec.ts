import { Test } from '@nestjs/testing';
import { CarService } from '../Car.service';
import { KEY_OF_INJECTION } from 'src/@shared/metadata';
import { CarInMemoryRepository } from 'src/Application/Infra/Repositories/Car/CarInMemory.repository';
import { CreateCarDto } from '../dtos/CreateCar.dto';
import { cars } from './cars';

describe('CarService', () => {
  let carService: CarService;
  const carDto: CreateCarDto = {
    licensePlate: 'ABC-1234',
    chassis: '9BWZZZ377HP123456',
    registrationNumber: '12345678901',
    model: 'Gol',
    brand: 'Volkswagen',
    year: '2020',
    imageUrl: 'https://example.com/car-image.jpg',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: KEY_OF_INJECTION.CAR_REPOSITORY,
          useClass: CarInMemoryRepository,
        },
        CarService,
      ],
    }).compile();

    carService = moduleRef.get(CarService);
  });

  it('carService must be defined', () => {
    expect(carService).toBeDefined();
  });

  it('should be able create a car that not exist', async () => {
    await expect(carService.create(carDto)).resolves.toBeDefined();
  });

  it('should be able delete with soft dele car', async () => {
    const carCreated = await carService.create(carDto);

    expect(carCreated.deletedAt).toBeNull();

    const carSoftDeleted = await carService.softDeleteCar(carCreated.id);

    expect(carSoftDeleted.deletedAt).not.toBeNull();
  });

  it('should be able get all cars not deleted', async () => {
    const carsCreatedAsPromise = cars.map((car) => {
      return carService.create(car);
    });

    const carsCreated = await Promise.all(carsCreatedAsPromise);

    const randomIndex = Math.floor(Math.random() * carsCreated.length);
    const randomCar = carsCreated[randomIndex];

    await carService.softDeleteCar(randomCar.id);

    const allCarsWithOutSoftDeleted =
      await carService.getGetAllCarsNonDeleted();

    const carDeleted = allCarsWithOutSoftDeleted.find(
      (car) => car.id === randomCar.id,
    );

    expect(carDeleted).toBeFalsy();
  });

  it('should be able delete permanently a car', async () => {
    const carCreated = await carService.create(carDto);

    await carService.permanentlyDelete(carCreated.id);

    const carDeleted = await expect(
      carService.getById(carCreated.id),
    ).rejects.toThrow();
  });

  it('must be update car the already exist', async () => {
    const carCreated = await carService.create(carDto);

    const carUpdated = await carService.updateCar({
      carId: carCreated.id,
      brand: 'new brand',
    });

    expect(carUpdated.brand).toBe('new brand');
  });
});
