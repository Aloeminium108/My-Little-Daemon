import { Entity } from "../entity/entity.js"
import { Component, ComponentType } from "../component/component.js"
import { ECS } from "../ecs.js"

abstract class System {

    entities = new Set<Entity>()

    constructor(private ecs: ECS | null = null) {}

    public abstract componentsRequired: Set<ComponentType<Component>>

    public abstract update(interval: number): void
    public abstract animate(ctx: CanvasRenderingContext2D): void

    addToECS = (ecs: ECS) => {
        this.ecs = ecs
    }

    addEntity = (entity: Entity) => {
        this.entities.add(entity)
    }

    removeEntity = (entity: Entity) => {
        this.entities.delete(entity)
    }

}

export {System}