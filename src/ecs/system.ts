import { Entity } from "./entity.js"
import { Component, ComponentType } from "./component.js"
import { ECS } from "./ecs.js"

abstract class System {

    entities = new Set<Entity>()

    constructor(public ecs: ECS) {}

    public abstract componentsRequired: Set<ComponentType<Component>>

    public abstract update(interval: number): void

    addEntity = (entity: Entity) => {
        this.entities.add(entity)
    }

    removeEntity = (entity: Entity) => {
        this.entities.delete(entity)
    }

}

export {System}