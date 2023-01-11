import { Component, ComponentType } from "../component/component.js"
import { Friction } from "../component/friction.js"
import { Gravity } from "../component/gravity.js"
import { Hitbox } from "../component/hitbox.js"
import { MouseGrabbable } from "../component/mousegrabbable.js"
import { MouseInteractable } from "../component/mouseinteractable.js"
import { Position } from "../component/position.js"
import { Sprite } from "../component/sprite.js"
import { Velocity } from "../component/velocity.js"
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
        let missingComponent = Array.from(componentClasses).find(neededComponent => {
            return !this.componentSet.has(neededComponent)
        })
        return missingComponent === undefined
    }

    addToECS = (ecs: ECS) => {
        this.ecs = ecs
    }

    addPhysicsBody = (x: number, y: number, z: number, image: ImageBitmap) => {
        let position = new Position(x, y)
        let sprite = new Sprite(z, image)
        this.addComponent(position)
        this.addComponent(sprite)
        this.addComponent(new Hitbox(position, image.width, image.height))
        this.addComponent(new Gravity())
        this.addComponent(new Friction())
        this.addComponent(new Velocity(0, 0))
    }

    addMouseGrab = () => {
        this.addComponent(new MouseInteractable(this.getComponent(Sprite)))
        this.addComponent(new MouseGrabbable())
    }
    
}

export {Entity}