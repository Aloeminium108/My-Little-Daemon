import { Entity } from "./entity/entity.js"
import { System } from "./system/system.js"

class ECS {

    private entities = new Set<Entity>()
    private systems = new Set<System>()
    private markedForDeletion = new Set<Entity>()

    addEntity = (entity: Entity) => {
        this.entities.add(entity)
        entity.addToECS(this)
        this.checkEntityForSystems(entity)
    }

    removeEntity = (entity: Entity) => {
        this.markedForDeletion.add(entity)
    }

    addSystem = (system: System) => {
        this.systems.add(system)
        system.addToECS(this)
        this.checkSystemForEntities(system)
    }

    removeSystem = (system: System) => {
        this.systems.delete(system)
    }

    update = (interval: number) => {
        this.systems.forEach(system => {
            system.update(interval)
        })

        this.markedForDeletion.forEach(entity => {
            this.entities.delete(entity)
            this.removeEntityFromSystems(entity)
        })
        this.markedForDeletion.clear()
    }

    animate = (ctx: CanvasRenderingContext2D) => {
        this.systems.forEach(system => {
            system.animate(ctx)
        })
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
}

export {ECS}