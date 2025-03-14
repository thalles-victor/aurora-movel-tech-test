import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get('id/:id')
  getCarById(@Param('id') id: string) {
    return this.carService.getById(id);
  }

  @Delete('soft/:id')
  softDeleCar(@Param('id') id: string) {
    return this.carService.softDeleteCar(id);
  }

  @Delete('permanently/:id')
  permanentlyDelete(@Param() id: string) {
    return this.carService.permanentlyDelete(id);
  }
}
