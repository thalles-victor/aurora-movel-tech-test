import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCarDto } from './dtos/CreateCar.dto';
import { CarService } from './Car.service';

@Controller({ path: 'car', version: '1' })
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get('all')
  getAllUndeletedCars() {
    return this.carService.getGetAllCarsNonDeleted();
  }
}
