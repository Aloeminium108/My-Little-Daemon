import { Entity } from "../entity/entity.js"
import { Component, OrderingComponent, ComponentType } from "../component/component.js"
import { ECS } from "../ecs.js"

abstract class System {

    abstract entities: Iterable<Entity>

    constructor(protected ecs: ECS | null = null) {}

    public abstract componentsRequired: Set<ComponentType<Component>>

    public abstract update(interval: number): void

    abstract addEntity(entity: Entity): void
    abstract removeEntity(entity: Entity): void

    addToECS = (ecs: ECS) => {
        this.ecs = ecs
    }

}

abstract class UnorderedSystem extends System {
    entities = new Set<Entity>()

    addEntity = (entity: Entity) => {
        this.entities.add(entity)
    }

    removeEntity = (entity: Entity) => {
        this.entities.delete(entity)
    }
}

abstract class OrderedSystem<T extends OrderingComponent> extends System {

    entities = new Array<Entity>()

    public abstract orderingComponent: ComponentType<T>

    addEntity = (entity: Entity) => {
        if (!this.entities.includes(entity)) {
            this.entities.push(entity)
            this.sortByOrderingComponent()
        }
    }

    removeEntity = (entity: Entity) => {
        let index = this.entities.findIndex((x) => x === entity)
        if (index < 0) return
        this.entities.splice(index, 1)
    }

    private sortByOrderingComponent = () => {
        this.entities.sort((a: Entity, b: Entity) => {
            let indexA = a.getComponent(this.orderingComponent).index
            let indexB = b.getComponent(this.orderingComponent).index
            return indexA - indexB
        }) 
    }
}

export {System, OrderedSystem, UnorderedSystem}