import { EventBroker } from "./system/eventsystem/eventbroker.js";
import { EventHandler, EventSynthesizer } from "./system/eventsystem/listeners/gameeventlistener.js";
import { ComponentSystem } from "./system/system.js";
class ECS {
    constructor() {
        this.eventBroker = new EventBroker();
        this.entities = new Set();
        this.systems = new Array();
        this.componentSystems = new Array;
        this.markedForDeletion = new Set();
        this.addEntity = (entity) => {
            this.entities.add(entity);
            entity.addToECS(this);
            this.checkEntityForSystems(entity);
            entity.childEntities.forEach(childEntity => {
                this.addEntity(childEntity);
            });
        };
        this.removeEntity = (entity) => {
            if (entity === null)
                return;
            this.markedForDeletion.add(entity);
        };
        this.addSystem = (system) => {
            this.systems.push(system);
            system.addToECS(this);
            if (system instanceof ComponentSystem) {
                this.componentSystems.push(system);
                this.checkSystemForEntities(system);
            }
            else if (system instanceof EventHandler || system instanceof EventSynthesizer) {
                this.eventBroker.addListener(system);
            }
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
            this.markedForDeletion.forEach(this.removeEntityAndChildren);
            this.markedForDeletion.clear();
        };
        this.checkEntityForSystems = (entity) => {
            this.componentSystems.forEach((system) => this.checkEntityAndSystem(entity, system));
        };
        this.checkSystemForEntities = (system) => {
            this.entities.forEach((entity) => this.checkEntityAndSystem(entity, system));
        };
        this.pushEvent = (gameEvent) => {
            this.eventBroker.pushEvent(gameEvent);
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
            this.componentSystems.forEach(system => {
                system.removeEntity(entity);
            });
        };
        this.removeEntityAndChildren = (entity) => {
            entity.childEntities.forEach(childEntity => {
                this.removeEntityAndChildren(childEntity);
            });
            this.entities.delete(entity);
            this.removeEntityFromSystems(entity);
        };
    }
}
export { ECS };
