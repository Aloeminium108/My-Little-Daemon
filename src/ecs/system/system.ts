import { Entity } from "../entity/entity.js"
import { Component, OrderingComponent, ComponentType } from "../component/component.js"
import { ECS } from "../ecs.js"

abstract class System {

    protected abstract entities: Iterable<Entity>

    constructor(protected ecs: ECS | null = null) {}

    public abstract componentsRequired: Set<ComponentType<Component>>

    public abstract update(interval: number): void
    public abstract animate(ctx: CanvasRenderingContext2D): void

    abstract addEntity(entity: Entity): void
    abstract removeEntity(entity: Entity): void

    addToECS = (ecs: ECS) => {
        this.ecs = ecs
    }

}

abstract class UnorderedSystem extends System {
    protected entities = new Set<Entity>()

    addEntity = (entity: Entity) => {
        this.entities.add(entity)
    }

    removeEntity = (entity: Entity) => {
        this.entities.delete(entity)
    }
}

abstract class OrderedSystem<T extends OrderingComponent> extends System {

    protected entities = new Array<Entity>()

    public abstract orderingComponent: ComponentType<T>

    addEntity = (entity: Entity) => {
        this.entities.push(entity)
        this.sortByOrderingComponent()
    }

    removeEntity(entity: Entity): void {
        let index = this.entities.findIndex((x) => x === entity)
        if (index < 0) return
        this.entities.splice(index, 1)
    }

    private sortByOrderingComponent = () => {
        this.entities.sort((a: Entity, b: Entity) => {
            let indexA = a.getComponent(this.orderingComponent.constructor as ComponentType<T>).index
            let indexB = b.getComponent(this.orderingComponent.constructor as ComponentType<T>).index
            return indexA - indexB
        }) 
    }
}

export {System, OrderedSystem, UnorderedSystem}