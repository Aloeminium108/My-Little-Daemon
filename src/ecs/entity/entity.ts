import { Component, ComponentType } from "../component/component.js"
import { Friction } from "../component/friction.js"
import { Gravity } from "../component/gravity.js"
import { Hitbox } from "../component/hitbox.js"
import { Position } from "../component/position.js"
import { Sprite } from "../component/sprite.js"
import { Velocity } from "../component/velocity.js"
import { ECS } from "../ecs.js"

class Entity {
    
    private componentSet = new Map<ComponentType<Component>, Component>()
    
    constructor(private ecs: ECS | null = null) {}

    addComponent = <T extends Component>(component: Component) => {
        this.componentSet.set(component.constructor as ComponentType<T>, component)
        console.log("Component added:", component)
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
                return false
            }
        }
        return true
    }

    addToECS = (ecs: ECS) => {
        this.ecs = ecs
    }

    addPhysicsBody = (x: number, y: number, image: ImageBitmap) => {
        let position = new Position(x, y)
        let sprite = new Sprite(0, image)
        this.addComponent(position)
        this.addComponent(sprite)
        this.addComponent(new Hitbox(position, image.width, image.height))
        this.addComponent(new Gravity())
        this.addComponent(new Friction())
        this.addComponent(new Velocity(0, 0))
    }
    
}

export {Entity}