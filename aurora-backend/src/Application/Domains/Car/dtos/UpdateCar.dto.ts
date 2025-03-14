import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsNotEmpty()
  carId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  model?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  year?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imageUrl?: string;
}
