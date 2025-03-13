import {
  UserEntity,
  UserUniqueRefs,
  UserUpdateEntity,
} from 'src/Application/Entities/User.entity';
import { IUserRepositoryContract } from './User.repository-contract';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserInMemoryRepository implements IUserRepositoryContract {
  private users: UserEntity[] = [];

  async getBy(unqRef: UserUniqueRefs): Promise<UserEntity | null> {
    const [key, value] = Object.entries(unqRef)[0]; // Extrai chave e valor do UserUniqueRefs
    const user = this.users.find((user) => user[key] === value);
    return user ?? null;
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    const newUser = { ...entity };
    this.users.push(newUser);
    return newUser;
  }

  async update(
    unqRef: Partial<Pick<UserEntity, 'id' | 'email'>>,
    updEntity: UserUpdateEntity,
  ): Promise<UserEntity> {
    const [key, value] = Object.entries(unqRef)[0]; // Extrai chave e valor do unqRef
    const userIndex = this.users.findIndex((user) => user[key] === value);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ${key} ${value} not found`);
    }

    const updatedUser = { ...this.users[userIndex], ...updEntity };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async softDelete(
    unqRef: Partial<Pick<UserEntity, 'id' | 'email'>>,
  ): Promise<UserEntity> {
    const [key, value] = Object.entries(unqRef)[0]; // Extrai chave e valor do unqRef
    const userIndex = this.users.findIndex((user) => user[key] === value);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ${key} ${value} not found`);
    }

    const updatedUser = { ...this.users[userIndex], deletedAt: new Date() };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async delete(
    unqRef: Partial<Pick<UserEntity, 'id' | 'email'>>,
  ): Promise<void> {
    const [key, value] = Object.entries(unqRef)[0]; // Extrai chave e valor do unqRef
    const userIndex = this.users.findIndex((user) => user[key] === value);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ${key} ${value} not found`);
    }

    this.users.splice(userIndex, 1);
  }

  clear(): void {
    this.users = [];
  }
}
