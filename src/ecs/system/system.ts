import { Entity } from "../entity/entity.js"
import { Component, OrderingComponent, ComponentType } from "../component/component.js"
import { ECS } from "../ecs.js"

interface System {

    ecs: ECS | null

    update(interval: number): void

}

interface ComponentSystem extends System{

    entities: Iterable<Entity>

    componentsRequired: Set<ComponentType<Component>>

    addEntity(entity: Entity): void
    removeEntity(entity: Entity): void

}

abstract class UnorderedSystem implements ComponentSystem {

    abstract componentsRequired: Set<ComponentType<Component>>

    abstract update(interval: number): void

    ecs: ECS | null = null

    entities = new Set<Entity>()

    addEntity = (entity: Entity) => {
        this.entities.add(entity)
    }

    removeEntity = (entity: Entity) => {
        this.entities.delete(entity)
    }
}

abstract class OrderedSystem<T extends OrderingComponent> implements ComponentSystem {

    abstract componentsRequired: Set<ComponentType<Component>>

    abstract update(interval: number): void

    ecs: ECS | null = null

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

export {System, ComponentSystem, OrderedSystem, UnorderedSystem}