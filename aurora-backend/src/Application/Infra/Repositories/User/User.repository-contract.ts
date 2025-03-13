import {
  UserEntity,
  UserUniqueRefs,
  UserUpdateEntity,
} from 'src/Application/Entities/User.entity';
import { IBaseRepositoryContract } from '../IBase.repository-contract';

export interface IUserRepositoryContract
  extends IBaseRepositoryContract<
    UserEntity,
    UserUpdateEntity,
    UserUniqueRefs
  > {}
