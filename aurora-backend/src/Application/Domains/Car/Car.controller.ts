import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCarDto } from './dtos/CreateCar.dto';
import { CarService } from './Car.service';
import { JwtAuthGuard, RoleGuard } from 'src/@shared/guards';
import { RolesDecorator } from 'src/@shared/decorators';
import { ROLE } from 'src/@shared/metadata';

@Controller({ path: 'car', version: '1' })
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RolesDecorator(ROLE.ROOT, ROLE.ADMIN)
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get('all')
  getAllUndeletedCars() {
    return this.carService.getGetAllCarsNonDeleted();
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RolesDecorator(ROLE.ROOT, ROLE.ADMIN)
  getCarById(@Param('id') id: string) {
    return this.carService.getById(id);
  }

  @Delete('soft/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RolesDecorator(ROLE.ROOT, ROLE.ADMIN)
  softDeleCar(@Param('id') id: string) {
    return this.carService.softDeleteCar(id);
  }

  @Delete('permanently/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RolesDecorator(ROLE.ROOT, ROLE.ADMIN)
  permanentlyDelete(@Param() id: string) {
    return this.carService.permanentlyDelete(id);
  }
}
