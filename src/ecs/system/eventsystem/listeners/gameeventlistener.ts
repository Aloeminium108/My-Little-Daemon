import { Component, ComponentType } from "../../../component/component.js";
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

    abstract update(interval: number): void

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


class EventConverter<T extends GameEvent, R extends GameEvent>{

    constructor(
        public eventClass: EventClass<T>,
        public convert: (gameEvent: T) => R
    ) {}

}


abstract class EventSynthesizer<T extends GameEvent> implements GameEventListener, System {

    abstract eventClasses: Set<EventClass<GameEvent>>;
    
    abstract converters: Set<EventConverter<GameEvent, T>>

    ecs: ECS | null = null

    eventBroker: EventBroker | null = null

    eventStack: Map<EventClass<GameEvent>, Array<GameEvent>> = new Map()

    synthesisMethods: Map<EventClass<GameEvent>, EventConverter<GameEvent, T>> = new Map()

    init = () => {
        this.converters.forEach(handler => {
            this.synthesisMethods.set(handler.eventClass, handler)
        })
    }

    synthesizeEvents = () => {
        this.eventStack.forEach((stack, eventClass) => {
            let converter = this.synthesisMethods.get(eventClass)
            if (converter === undefined) return

            while(stack.length > 0) {
                this.eventBroker?.pushEvent(converter.convert(stack.pop()!!))
            }
        })
    }

    pushEvent = <T extends GameEvent>(gameEvent: T) => {
        let eventClass = gameEvent.constructor as EventClass<T>

        if (!this.synthesisMethods.has(eventClass)) return

        if (!this.eventStack.has(eventClass)) {
            this.eventStack.set(eventClass, [gameEvent])
        } else {
            this.eventStack.get(eventClass)?.push(gameEvent)
        } 
    }

    update = (interval: number) => {
        this.synthesizeEvents()
    }
    
}


export {GameEventListener, EventSynthesizer, EventHandler, EventConverter, EventComponentSystem}