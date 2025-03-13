import { InternalServerErrorException } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';

export function splitKeyAndValue(unqRef: object) {
  const [key, value] = Object.entries(unqRef)[0];

  if (!key || !value) {
    throw new InternalServerErrorException('require key and value');
  }

  return [key, value];
}

export function checkIfFolderExistAndCreate(bucket: string) {
  const uploadPath = path.join(process.cwd(), '@Upload');
  const filePath = path.join(uploadPath, bucket);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  return filePath;
}

export function generateRandomFileName(originalFileName: string): string {
  const fileName = originalFileName.substring(
    0,
    originalFileName.lastIndexOf('.'),
  );
  const fileExtension = originalFileName.substring(
    originalFileName.lastIndexOf('.'),
  );

  const randomKey = Date.now() + '-' + Math.round(Math.random() * 1e9);

  const newFileName = `${fileName}-${randomKey}${fileExtension}`;

  return newFileName;
}

export function generateShortId(length: number = 14): string {
  if (length < 10) {
    throw new Error(
      'Length must be at least 10 characters for reasonable uniqueness',
    );
  }

  const timestamp = Date.now().toString(36);

  const randomLength = length - timestamp.length - 1;

  const randomPart = Math.random()
    .toString(36)
    .substr(2, randomLength > 0 ? randomLength : 1); // Garante pelo menos 1 caractere

  const fullId = `${timestamp}-${randomPart}`;

  return fullId.substr(0, length);
}
