class System {
    constructor(ecs = null) {
        this.ecs = ecs;
        this.addToECS = (ecs) => {
            this.ecs = ecs;
        };
    }
}
class UnorderedSystem extends System {
    constructor() {
        super(...arguments);
        this.entities = new Set();
        this.addEntity = (entity) => {
            this.entities.add(entity);
        };
        this.removeEntity = (entity) => {
            this.entities.delete(entity);
        };
    }
}
class OrderedSystem extends System {
    constructor() {
        super(...arguments);
        this.entities = new Array();
        this.addEntity = (entity) => {
            this.entities.push(entity);
            this.sortByOrderingComponent();
        };
        this.sortByOrderingComponent = () => {
            this.entities.sort((a, b) => {
                let indexA = a.getComponent(this.orderingComponent.constructor).index;
                let indexB = b.getComponent(this.orderingComponent.constructor).index;
                return indexA - indexB;
            });
        };
    }
    removeEntity(entity) {
        let index = this.entities.findIndex((x) => x === entity);
        if (index < 0)
            return;
        this.entities.splice(index, 1);
    }
}
export { System, OrderedSystem, UnorderedSystem };
