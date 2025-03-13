import { IsString, Length, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCarDto {
  @IsString({ message: 'License plate must be a string' })
  @IsNotEmpty({ message: 'License plate is required' })
  @Length(1, 20, {
    message: 'License plate must be between 1 and 20 characters',
  })
  licensePlate: string; // placa

  @IsString({ message: 'Chassis must be a string' })
  @IsNotEmpty({ message: 'Chassis is required' })
  @Length(1, 40, { message: 'Chassis must be between 1 and 40 characters' })
  chassis: string; // chassi

  @IsString({ message: 'Registration number must be a string' })
  @IsNotEmpty({ message: 'Registration number is required' })
  @Length(1, 40, {
    message: 'Registration number must be between 1 and 40 characters',
  })
  registrationNumber: string; // renavam

  @IsString({ message: 'Model must be a string' })
  @IsNotEmpty({ message: 'Model is required' })
  @Length(1, 40, { message: 'Model must be between 1 and 40 characters' })
  model: string; // modelo

  @IsString({ message: 'Brand must be a string' })
  @IsNotEmpty({ message: 'Brand is required' })
  @Length(1, 40, { message: 'Brand must be between 1 and 40 characters' })
  brand: string; // marca

  @IsString({ message: 'Year must be a string' })
  @IsNotEmpty({ message: 'Year is required' })
  @Length(4, 4, { message: 'Year must be exactly 4 characters' })
  @Transform(({ value }) => value.toString(), { toClassOnly: true })
  year: string; // ano

  @IsString({ message: 'Year must be a string' })
  @IsOptional({ message: 'url from image is optional' })
  imageUrl?: string;
}
