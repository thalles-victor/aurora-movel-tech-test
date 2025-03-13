import {
  BrandEntity,
  BrandUniqueRefs,
  BrandUpdateEntity,
} from 'src/Application/Entities/Brand.enitty';
import { IBaseRepositoryContract } from '../IBase.repository-contract';

export interface IBrandRepositoryContract
  extends IBaseRepositoryContract<
    BrandEntity,
    BrandUpdateEntity,
    BrandUniqueRefs
  > {}
