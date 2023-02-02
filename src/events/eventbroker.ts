import { EventClass, GameEvent } from "./gameevent.js"
import { EventHandler, EventSynthesizer, GameEventListener } from "./gameeventlistener.js"

class EventBroker {

    private eventSubscribers: Map<EventClass<GameEvent>, Set<GameEventListener>> = new Map()

    pushEvent = <T extends GameEvent>(gameEvent: T) => {
        let eventClass = gameEvent.constructor as EventClass<T>

        let subscribers = this.eventSubscribers.get(eventClass)

        subscribers?.forEach(subscriber => {
            subscriber.pushEvent(gameEvent)
        })
    }

    addHandler = <T extends GameEvent>(eventHandler: EventHandler<T>) => {
        let eventClass = eventHandler.eventClass
        if (!this.eventSubscribers.has(eventClass)) {
            this.eventSubscribers.set(eventClass, new Set([eventHandler]))
        } else {
            this.eventSubscribers.get(eventClass)!!.add(eventHandler)
        }

        eventHandler.eventBroker = this
    }

    addSynthesizer = <T extends GameEvent>(eventSynthesizer: EventSynthesizer<T>) => {
        eventSynthesizer.eventClass.forEach(eventType => {
            if (!this.eventSubscribers.has(eventType)) {
                this.eventSubscribers.set(eventType, new Set([eventSynthesizer]))
            } else {
                this.eventSubscribers.get(eventType)!!.add(eventSynthesizer)
            }
        })
        
        eventSynthesizer.eventBroker = this
    }

}

export {EventBroker}