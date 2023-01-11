import { Component, ComponentType } from "../component/component.js"
import { ECS } from "../ecs.js"

class Entity {
    
    private componentSet = new Map<ComponentType<Component>, Component>()
    
    constructor(private ecs: ECS | null = null) {}

    addComponent = <T extends Component>(component: Component) => {
        this.componentSet.set(component.constructor as ComponentType<T>, component)
        this.ecs?.checkEntityForSystems(this)
    }

    getComponent = <T extends Component>(componentClass: ComponentType<T>) => {
        return this.componentSet.get(componentClass) as T
    }

    getPossibleComponent = <T extends Component>(componentClass: ComponentType<T>) => {
        return this.componentSet.get(componentClass) as T | undefined
    }

    deleteComponent = <T extends Component>(componentClass: ComponentType<T>) => {
        this.componentSet.delete(componentClass)
        this.ecs?.checkEntityForSystems(this)
    }

    hasAll = (componentClasses: Set<ComponentType<Component>>) => {
        for (let neededComponent of componentClasses) {
            if (!this.componentSet.has(neededComponent)) {
                console.log("Component missing:", neededComponent)
                return false
            }
        }
        return true
    }

    addToECS(ecs: ECS) {
        this.ecs = ecs
    }
    
}

export {Entity}