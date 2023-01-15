import { Entity } from "./entity/entity.js"
import { System } from "./system/system.js"

class ECS {

    private entities = new Set<Entity>()
    private systems = new Array<System>()
    private markedForDeletion = new Set<Entity>()

    addEntity = (entity: Entity) => {
        this.entities.add(entity)
        entity.addToECS(this)
        this.checkEntityForSystems(entity)
        
        entity.childEntities.forEach(childEntity => {
            this.addEntity(childEntity)
        })
    }

    removeEntity = (entity: Entity) => {
        this.markedForDeletion.add(entity)
    }

    addSystem = (system: System) => {
        this.systems.push(system)
        system.addToECS(this)
        this.checkSystemForEntities(system)
    }

    removeSystem = (system: System) => {
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
        this.systems.forEach((system) => this.checkEntityAndSystem(entity, system))
    }

    checkSystemForEntities = (system: System) => {
        this.entities.forEach((entity) => this.checkEntityAndSystem(entity, system))
    }

    private checkEntityAndSystem = (entity:Entity, system: System) => {
        if (entity.hasAll(system.componentsRequired)) {
            system.addEntity(entity)
        } else {
            system.removeEntity(entity)
        }
    }

    private removeEntityFromSystems = (entity: Entity) => {
        this.systems.forEach(system => {
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