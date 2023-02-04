import { Game } from "../../../../game.js";
import { Component, ComponentType, OrderingComponent } from "../../../component/component.js";
import { ECS } from "../../../ecs.js";
import { Entity } from "../../../entity/entity.js";
import { ComponentSystem, System } from "../../system.js";
import { EventBroker } from "../eventbroker.js";
import { EventClass, GameEvent } from "../events/gameevent.js";

interface GameEventListener {

    eventClasses: Set<EventClass<GameEvent>>

    pushEvent(gameEvent: GameEvent): void

    eventBroker: EventBroker | null

}


abstract class EventHandler<T extends GameEvent> implements GameEventListener, System {

    protected eventStack: Array<T> = []

    abstract eventClasses: Set<EventClass<T>>

    abstract handleEvent(gameEvent: T): void

    ecs: ECS | null = null

    eventBroker: EventBroker | null = null

    pushEvent = (gameEvent: T) => {
        this.eventStack.push(gameEvent)
    }

    handleEvents = () => {
        while (this.eventStack.length > 0) {
            this.handleEvent(this.eventStack.pop()!!)
        }
    }

    update(interval: number): void {
        this.handleEvents()
    }
    
}


abstract class EventComponentSystem<T extends GameEvent> extends EventHandler<T> implements GameEventListener, ComponentSystem {

    abstract eventClasses: Set<EventClass<T>>

    abstract componentsRequired: Set<ComponentType<Component>>

    ecs: ECS | null = null

    eventBroker: EventBroker | null = null

    entities = new Set<Entity>()

    addEntity = (entity: Entity) => {
        this.entities.add(entity)
    }

    removeEntity = (entity: Entity) => {
        this.entities.delete(entity)
    }

}

abstract class OrderedEventComponentSystem<T extends OrderingComponent, U extends GameEvent> extends EventHandler<U> implements GameEventListener, ComponentSystem {

    abstract eventClasses: Set<EventClass<U>>

    abstract componentsRequired: Set<ComponentType<Component>>

    ecs: ECS | null = null

    eventBroker: EventBroker | null = null

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


abstract class EventSynthesisSystem implements GameEventListener, System {

    abstract eventClasses: Set<EventClass<GameEvent>>;

    abstract update(interval: number): void;

    ecs: ECS | null = null

    eventBroker: EventBroker | null = null

    eventStack: Map<EventClass<GameEvent>, Array<GameEvent>> = new Map()

    pushEvent = <T extends GameEvent>(gameEvent: T) => {
        let eventClass = gameEvent.constructor as EventClass<T>

        if (!this.eventStack.has(eventClass)) {
            this.eventStack.set(eventClass, [gameEvent])
        } else {
            this.eventStack.get(eventClass)?.push(gameEvent)
        } 
    }

    getEventStack = <T extends GameEvent>(eventClass: EventClass<T>) => {
        if (!this.eventStack.has(eventClass)) return [] as T[]
        return this.eventStack.get(eventClass) as T[]
    }

    popEventStack = <T extends GameEvent>(eventClass: EventClass<T>) => {
        return this.eventStack.get(eventClass)?.pop() as T | undefined
    }
    
}


export {GameEventListener, EventSynthesisSystem, EventHandler, EventComponentSystem, OrderedEventComponentSystem}