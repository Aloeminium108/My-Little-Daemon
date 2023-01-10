class System {
    constructor(ecs = null) {
        this.ecs = ecs;
        this.entities = new Set();
        this.addToECS = (ecs) => {
            this.ecs = ecs;
        };
        this.addEntity = (entity) => {
            this.entities.add(entity);
        };
        this.removeEntity = (entity) => {
            this.entities.delete(entity);
        };
    }
}
export { System };
