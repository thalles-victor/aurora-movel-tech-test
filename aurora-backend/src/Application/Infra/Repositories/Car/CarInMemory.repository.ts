import { CarEntity } from 'src/Application/Entities/Car.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICarRepositoryContract } from './ICar.repository-contract';

@Injectable()
export class CarInMemoryRepository implements ICarRepositoryContract {
  private cars: CarEntity[] = [];

  async getBy(
    unqRef: Required<Pick<Pick<CarEntity, 'id'>, 'id'>> &
      Partial<Record<never, never>>,
  ): Promise<CarEntity | null> {
    const car = this.cars.find((car) => car.id === unqRef.id);
    return car ?? null;
  }

  async create(entity: CarEntity): Promise<CarEntity> {
    const newCar = { ...entity };
    this.cars.push(newCar);
    return newCar;
  }

  async update(
    unqRef: Required<Pick<Pick<CarEntity, 'id'>, 'id'>> &
      Partial<Record<never, never>>,
    updEntity: Partial<Pick<CarEntity, 'name' | 'brand'>>,
  ): Promise<CarEntity> {
    const carIndex = this.cars.findIndex((car) => car.id === unqRef.id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with id ${unqRef.id} not found`);
    }

    const updatedCar = { ...this.cars[carIndex], ...updEntity };
    this.cars[carIndex] = updatedCar;
    return updatedCar;
  }

  async softDelete(
    unqRef: Required<Pick<Pick<CarEntity, 'id'>, 'id'>> &
      Partial<Record<never, never>>,
  ): Promise<CarEntity> {
    const carIndex = this.cars.findIndex((car) => car.id === unqRef.id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with id ${unqRef.id} not found`);
    }

    const updatedCar = { ...this.cars[carIndex], deletedAt: new Date() };
    this.cars[carIndex] = updatedCar;
    return updatedCar;
  }

  async delete(
    unqRef: Required<Pick<Pick<CarEntity, 'id'>, 'id'>> &
      Partial<Record<never, never>>,
  ): Promise<void> {
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
