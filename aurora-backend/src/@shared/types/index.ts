import { ROLE } from '../metadata';

export type PayloadType = {
  id: string;
  email: string;
  roles: ROLE[];
};

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, never>>;
}[Keys];

export type StorageSaveResult = {
  bucket: string;
  provider: 'S3' | 'LOCAL';
  etag: string;
  key: string;
  location: string;
};
