import { Entity } from "./entity/entity.js"
import { EventBroker } from "./system/eventsystem/eventbroker.js"
import { GameEvent } from "./system/eventsystem/events/gameevent.js"
import { EventHandler, EventSynthesizer } from "./system/eventsystem/listeners/gameeventlistener.js"
import { ComponentSystem, System } from "./system/system.js"

class ECS {

    private eventBroker = new EventBroker()

    private entities = new Set<Entity>()
    private systems = new Array<System>()
    private componentSystems = new Array<ComponentSystem>
    private markedForDeletion = new Set<Entity>()

    addEntity = (entity: Entity) => {
        this.entities.add(entity)
        entity.addToECS(this)
        this.checkEntityForSystems(entity)
        
        entity.childEntities.forEach(childEntity => {
            this.addEntity(childEntity)
        })
    }

    removeEntity = (entity: Entity | null) => {
        if (entity === null) return
        this.markedForDeletion.add(entity)
    }

    addSystem = (system: System) => {
        this.systems.push(system)
        system.addToECS(this)

        if (system instanceof ComponentSystem) {
            this.componentSystems.push(system)
            this.checkSystemForEntities(system)
        } else if (system instanceof EventHandler || system instanceof EventSynthesizer) {
            this.eventBroker.addListener(system)
        }
    }

    removeSystem = (system: ComponentSystem) => {
        let index = this.systems.findIndex((x) => x === system)
        if (index < 0) return
        this.systems.splice(index, 1)
    }

    update = (interval: number) => {
        this.systems.forEach(system => {
            system.update(interval)
        })

        this.markedForDeletion.forEach(this.removeEntityAndChildren)
        this.markedForDeletion.clear()
    }

    checkEntityForSystems = (entity: Entity) => {
        this.componentSystems.forEach((system) => this.checkEntityAndSystem(entity, system))
    }

    checkSystemForEntities = (system: ComponentSystem) => {
        this.entities.forEach((entity) => this.checkEntityAndSystem(entity, system))
    }

    pushEvent = (gameEvent: GameEvent) => {
        this.eventBroker.pushEvent(gameEvent)
    }

    private checkEntityAndSystem = (entity:Entity, system: ComponentSystem) => {
        if (entity.hasAll(system.componentsRequired)) {
            system.addEntity(entity)
        } else {
            system.removeEntity(entity)
        }
    }

    private removeEntityFromSystems = (entity: Entity) => {
        this.componentSystems.forEach(system => {
            system.removeEntity(entity)
        })
    }

    private removeEntityAndChildren = (entity: Entity) => {
        entity.childEntities.forEach(childEntity => {
            this.removeEntityAndChildren(childEntity)
        })
        this.entities.delete(entity)
        this.removeEntityFromSystems(entity)
    }
}

export {ECS}