class ECS {
    constructor() {
        this.entities = new Set();
        this.systems = new Array();
        this.markedForDeletion = new Set();
        this.addEntity = (entity) => {
            this.entities.add(entity);
            entity.addToECS(this);
            this.checkEntityForSystems(entity);
        };
        this.removeEntity = (entity) => {
            this.markedForDeletion.add(entity);
        };
        this.addSystem = (system) => {
            this.systems.push(system);
            system.addToECS(this);
            this.checkSystemForEntities(system);
        };
        this.removeSystem = (system) => {
            let index = this.systems.findIndex((x) => x === system);
            if (index < 0)
                return;
            this.systems.splice(index, 1);
        };
        this.update = (interval) => {
            this.systems.forEach(system => {
                system.update(interval);
            });
            this.markedForDeletion.forEach(entity => {
                this.entities.delete(entity);
                this.removeEntityFromSystems(entity);
            });
            this.markedForDeletion.clear();
        };
        this.checkEntityForSystems = (entity) => {
            this.systems.forEach((system) => this.checkEntityAndSystem(entity, system));
        };
        this.checkSystemForEntities = (system) => {
            this.entities.forEach((entity) => this.checkEntityAndSystem(entity, system));
        };
        this.checkEntityAndSystem = (entity, system) => {
            if (entity.hasAll(system.componentsRequired)) {
                system.addEntity(entity);
            }
            else {
                system.removeEntity(entity);
            }
        };
        this.removeEntityFromSystems = (entity) => {
            this.systems.forEach(system => {
                system.removeEntity(entity);
            });
        };
    }
}
export { ECS };
