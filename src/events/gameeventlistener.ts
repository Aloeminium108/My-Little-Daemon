import { EventBroker } from "./eventbroker.js";
import { EventClass, GameEvent } from "./gameevent.js";

interface GameEventListener {

    eventClass: Set<EventClass<GameEvent>> | EventClass<GameEvent>

    pushEvent(gameEvent: GameEvent): void

    eventBroker: EventBroker | null

}


abstract class EventHandler<T extends GameEvent> implements GameEventListener {

    eventBroker: EventBroker | null = null

    private eventStack: Array<T> = []

    abstract eventClass: EventClass<T>

    abstract handleEvent(gameEvent: T): void

    pushEvent = (gameEvent: T) => {
        this.eventStack.push(gameEvent)
    }

    handleEvents = () => {
        this.eventStack.forEach(gameEvent => {
            this.handleEvent(gameEvent)
        })
    }
    
}


class EventConverter<T extends GameEvent, R extends GameEvent>{

    constructor(
        public eventClass: EventClass<T>,
        public convert: (gameEvent: T) => R
    ) {}

}


abstract class EventSynthesizer<T extends GameEvent> implements GameEventListener {

    eventBroker: EventBroker | null = null

    eventStack: Map<EventClass<GameEvent>, Array<GameEvent>> = new Map()

    synthesisMethods: Map<EventClass<GameEvent>, EventConverter<GameEvent, T>> = new Map()

    abstract eventClass: Set<EventClass<GameEvent>>;
    abstract converters: Set<EventConverter<GameEvent, T>>

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
    
}


export {GameEventListener, EventSynthesizer, EventHandler, EventConverter}