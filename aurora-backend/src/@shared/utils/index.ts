import { InternalServerErrorException } from '@nestjs/common';

export function splitKeyAndValue(unqRef: object) {
  const [key, value] = Object.entries(unqRef)[0];

  if (!key || !value) {
    throw new InternalServerErrorException('require key and value');
  }

  return [key, value];
}
