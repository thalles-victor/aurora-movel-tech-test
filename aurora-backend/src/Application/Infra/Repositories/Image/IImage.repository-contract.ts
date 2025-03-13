import {
  ImageEntity,
  ImageUniqueRefs,
  ImageUpdateEntity,
} from 'src/Application/Entities/Image.entity';
import { IBaseRepositoryContract } from '../IBase.repository-contract';

export interface IIMageRepositoryContract
  extends IBaseRepositoryContract<
    ImageEntity,
    ImageUpdateEntity,
    ImageUniqueRefs
  > {}
