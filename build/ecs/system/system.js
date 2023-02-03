class UnorderedSystem {
    constructor() {
        this.ecs = null;
        this.entities = new Set();
        this.addEntity = (entity) => {
            this.entities.add(entity);
        };
        this.removeEntity = (entity) => {
            this.entities.delete(entity);
        };
    }
}
class OrderedSystem {
    constructor() {
        this.ecs = null;
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
export { OrderedSystem, UnorderedSystem };
