export interface IBaseRepositoryContract<
  Entity,
  UpdateEntity,
  EntityUniqueRefs,
> {
  getBy(unqRef: EntityUniqueRefs): Promise<Entity | null>;
  create(entity: Entity): Promise<Entity>;
  update(unqRef: EntityUniqueRefs, updEntity: UpdateEntity): Promise<Entity>;
  softDelete(unqRef: EntityUniqueRefs): Promise<Entity>;
  delete(unqRef: EntityUniqueRefs): Promise<void>;
}
