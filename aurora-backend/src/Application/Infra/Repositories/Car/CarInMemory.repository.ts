import {
  CarEntity,
  CarUniqueRefs,
  CarUpdateEntity,
} from 'src/Application/Entities/Car.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICarRepositoryContract } from './ICar.repository-contract';

@Injectable()
export class CarInMemoryRepository implements ICarRepositoryContract {
  private cars: CarEntity[] = [];

  async getBy(unqRef: CarUniqueRefs): Promise<CarEntity | null> {
    const car = this.cars.find((car) => car.id === unqRef.id);
    return car ?? null;
  }

  async create(entity: CarEntity): Promise<CarEntity> {
    const newCar = { ...entity };
    this.cars.push(newCar);
    return newCar;
  }

  async update(
    unqRef: CarUniqueRefs,
    updEntity: CarUpdateEntity,
  ): Promise<CarEntity> {
    const carIndex = this.cars.findIndex((car) => car.id === unqRef.id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with id ${unqRef.id} not found`);
    }

    const updatedCar = { ...this.cars[carIndex], ...updEntity };
    this.cars[carIndex] = updatedCar;
    return updatedCar;
  }

  async softDelete(unqRef: CarUniqueRefs): Promise<CarEntity> {
    const carIndex = this.cars.findIndex((car) => car.id === unqRef.id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with id ${unqRef.id} not found`);
    }

    const updatedCar = { ...this.cars[carIndex], deletedAt: new Date() };
    this.cars[carIndex] = updatedCar;
    return updatedCar;
  }

  async delete(unqRef: CarUniqueRefs): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === unqRef.id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with id ${unqRef.id} not found`);
    }

    this.cars.splice(carIndex, 1);
  }

  clear(): void {
    this.cars = [];
  }
}
