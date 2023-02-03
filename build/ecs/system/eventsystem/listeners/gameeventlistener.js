class EventHandler {
    constructor() {
        this.ecs = null;
        this.eventBroker = null;
        this.eventStack = [];
        this.pushEvent = (gameEvent) => {
            this.eventStack.push(gameEvent);
        };
        this.handleEvents = () => {
            while (this.eventStack.length > 0) {
                this.handleEvent(this.eventStack.pop());
            }
        };
    }
    addToECS(ecs) {
        this.ecs = ecs;
    }
    update(interval) {
        this.handleEvents();
    }
}
class EventConverter {
    constructor(eventClass, convert) {
        this.eventClass = eventClass;
        this.convert = convert;
    }
}
class EventSynthesizer {
    constructor() {
        this.ecs = null;
        this.eventBroker = null;
        this.eventStack = new Map();
        this.synthesisMethods = new Map();
        this.init = () => {
            this.converters.forEach(handler => {
                this.synthesisMethods.set(handler.eventClass, handler);
            });
        };
        this.synthesizeEvents = () => {
            this.eventStack.forEach((stack, eventClass) => {
                var _a;
                let converter = this.synthesisMethods.get(eventClass);
                if (converter === undefined)
                    return;
                while (stack.length > 0) {
                    (_a = this.eventBroker) === null || _a === void 0 ? void 0 : _a.pushEvent(converter.convert(stack.pop()));
                }
            });
        };
        this.pushEvent = (gameEvent) => {
            var _a;
            let eventClass = gameEvent.constructor;
            if (!this.synthesisMethods.has(eventClass))
                return;
            if (!this.eventStack.has(eventClass)) {
                this.eventStack.set(eventClass, [gameEvent]);
            }
            else {
                (_a = this.eventStack.get(eventClass)) === null || _a === void 0 ? void 0 : _a.push(gameEvent);
            }
        };
        this.update = (interval) => {
            this.synthesizeEvents();
        };
    }
    addToECS(ecs) {
        this.ecs = ecs;
    }
}
export { EventSynthesizer, EventHandler, EventConverter };
