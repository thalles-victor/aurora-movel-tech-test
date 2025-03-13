import {
  CarEntity,
  CarUniqueRefs,
  CarUpdateEntity,
} from 'src/Application/Entities/Car.entity';
import { IBaseRepositoryContract } from '../IBase.repository-contract';

export interface ICarRepositoryContract
  extends IBaseRepositoryContract<CarEntity, CarUpdateEntity, CarUniqueRefs> {}
