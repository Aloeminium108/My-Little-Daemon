class EventHandler {
    constructor() {
        this.eventStack = [];
        this.ecs = null;
        this.eventBroker = null;
        this.pushEvent = (gameEvent) => {
            this.eventStack.push(gameEvent);
        };
        this.handleEvents = () => {
            while (this.eventStack.length > 0) {
                this.handleEvent(this.eventStack.pop());
            }
        };
    }
    update(interval) {
        this.handleEvents();
    }
}
class EventComponentSystem extends EventHandler {
    constructor() {
        super(...arguments);
        this.ecs = null;
        this.eventBroker = null;
        this.entities = new Set();
        this.addEntity = (entity) => {
            this.entities.add(entity);
        };
        this.removeEntity = (entity) => {
            this.entities.delete(entity);
        };
    }
}
class OrderedEventComponentSystem extends EventHandler {
    constructor() {
        super(...arguments);
        this.ecs = null;
        this.eventBroker = null;
        this.entities = new Array();
        this.addEntity = (entity) => {
            if (!this.entities.includes(entity)) {
                this.entities.push(entity);
                this.sortByOrderingComponent();
            }
        };
        this.removeEntity = (entity) => {
            let index = this.entities.findIndex((x) => x === entity);
            if (index < 0)
                return;
            this.entities.splice(index, 1);
        };
        this.sortByOrderingComponent = () => {
            this.entities.sort((a, b) => {
                let indexA = a.getComponent(this.orderingComponent).index;
                let indexB = b.getComponent(this.orderingComponent).index;
                return indexA - indexB;
            });
        };
    }
}
class EventSynthesisSystem {
    constructor() {
        this.ecs = null;
        this.eventBroker = null;
        this.eventStack = new Map();
        this.pushEvent = (gameEvent) => {
            var _a;
            let eventClass = gameEvent.constructor;
            if (!this.eventStack.has(eventClass)) {
                this.eventStack.set(eventClass, [gameEvent]);
            }
            else {
                (_a = this.eventStack.get(eventClass)) === null || _a === void 0 ? void 0 : _a.push(gameEvent);
            }
        };
        this.getEventStack = (eventClass) => {
            if (!this.eventStack.has(eventClass))
                return [];
            return this.eventStack.get(eventClass);
        };
        this.popEventStack = (eventClass) => {
            var _a;
            return (_a = this.eventStack.get(eventClass)) === null || _a === void 0 ? void 0 : _a.pop();
        };
    }
}
export { EventSynthesisSystem, EventHandler, EventComponentSystem, OrderedEventComponentSystem };
