class EventBroker {
    constructor() {
        this.eventSubscribers = new Map();
        this.pushEvent = (gameEvent) => {
            let eventClass = gameEvent.constructor;
            let subscribers = this.eventSubscribers.get(eventClass);
            subscribers === null || subscribers === void 0 ? void 0 : subscribers.forEach(subscriber => {
                subscriber.pushEvent(gameEvent);
            });
        };
        this.addListener = (gameEventListener) => {
            let eventClasses = gameEventListener.eventClasses;
            eventClasses.forEach(eventType => {
                if (!this.eventSubscribers.has(eventType)) {
                    this.eventSubscribers.set(eventType, new Set([gameEventListener]));
                }
                else {
                    this.eventSubscribers.get(eventType).add(gameEventListener);
                }
            });
            gameEventListener.eventBroker = this;
        };
    }
}
export { EventBroker };
