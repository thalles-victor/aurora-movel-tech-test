import { CreateCarDto } from '../dtos/CreateCar.dto';

export const cars: CreateCarDto[] = [
  {
    licensePlate: 'XYZ-5678',
    chassis: '9BWZZZ377HP654321',
    registrationNumber: '98765432109',
    model: 'Civic',
    brand: 'Honda',
    year: '2018',
    imageUrl: 'https://example.com/car-image-abcde.jpg',
  },
  {
    licensePlate: 'KLM-9012',
    chassis: '9BWABC123DE456789',
    registrationNumber: '45678912345',
    model: 'Corolla',
    brand: 'Toyota',
    year: '2021',
    imageUrl: 'https://example.com/car-image-fghij.jpg',
  },
  {
    licensePlate: 'PQR-3456',
    chassis: '9BWXYZ789KL012345',
    registrationNumber: '12378945678',
    model: 'Uno',
    brand: 'Fiat',
    year: '2016',
    imageUrl: 'https://example.com/car-image-klmno.jpg',
  },
  {
    licensePlate: 'STU-7890',
    chassis: '9BWDEF456GH789012',
    registrationNumber: '32165498701',
    model: 'Fiesta',
    brand: 'Ford',
    year: '2023',
    imageUrl: 'https://example.com/car-image-pqrst.jpg',
  },
  {
    licensePlate: 'VWX-1234',
    chassis: '9BWJKL789MN345678',
    registrationNumber: '65432109876',
    model: 'Gol',
    brand: 'Volkswagen',
    year: '2019',
    imageUrl: 'https://example.com/car-image-uvwxy.jpg',
  },
];
