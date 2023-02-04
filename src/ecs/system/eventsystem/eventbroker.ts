import { EventClass, GameEvent } from "./events/gameevent.js"
import { EventHandler, EventSynthesisSystem, GameEventListener } from "./listeners/gameeventlistener.js"

class EventBroker {

    private eventSubscribers: Map<EventClass<GameEvent>, Set<GameEventListener>> = new Map()

    pushEvent = <T extends GameEvent>(gameEvent: T) => {
        let eventClass = gameEvent.constructor as EventClass<T>

        let subscribers = this.eventSubscribers.get(eventClass)

        subscribers?.forEach(subscriber => {
            subscriber.pushEvent(gameEvent)
        })
    }

    addListener = (gameEventListener: GameEventListener) => {
        let eventClasses = gameEventListener.eventClasses

        eventClasses.forEach(eventType => {
            if (!this.eventSubscribers.has(eventType)) {
                this.eventSubscribers.set(eventType, new Set([gameEventListener]))
            } else {
                this.eventSubscribers.get(eventType)!!.add(gameEventListener)
            }
        })
        
        gameEventListener.eventBroker = this
    }

}

export {EventBroker}