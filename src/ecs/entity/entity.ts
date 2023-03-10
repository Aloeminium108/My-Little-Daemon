import { CollisionBody } from "../component/physics/collisionbody.js"
import { Component, ComponentType } from "../component/component.js"
import { Friction } from "../component/physics/friction.js"
import { Gravity } from "../component/physics/gravity.js"
import { Hitbox } from "../component/physics/hitbox.js"
import { MouseGrabbable } from "../component/controls/mousegrabbable.js"
import { MouseInteractable } from "../component/controls/mouseinteractable.js"
import { Position } from "../component/physics/position.js"
import { Sprite } from "../component/graphics/sprite.js"
import { Velocity } from "../component/physics/velocity.js"
import { ECS } from "../ecs.js"

class Entity {
    
    private componentSet = new Map<ComponentType<Component>, Component>()

    public childEntities = new Set<Entity>
    
    constructor(public ecs: ECS | null = null) {}

    addComponent = <T extends Component>(component: Component) => {
        this.componentSet.set(component.constructor as ComponentType<T>, component)
        this.ecs?.checkEntityForSystems(this)
    }

    hasComponent = (componentClass: ComponentType<Component>) => {
        return this.componentSet.has(componentClass)
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
        this.childEntities.forEach(childEntity => {
            childEntity.ecs = ecs
        })
    }

    addPhysicsBody = (x: number, y: number, z: number, spriteSrc: string) => {
        let position = new Position(x, y)
        this.addComponent(new Gravity())
        this.addComponent(new Friction())
        this.addComponent(new Velocity(0, 0))

        let sprite = new Sprite(z, spriteSrc)
        this.addComponent(sprite)
        return sprite.loadingPromise.then(() => {
            this.addComponent(position)
            this.addComponent(new Hitbox(position, sprite.sprite!!.width, sprite.sprite!!.height))
        })
    }

    addZeroGPhysicsBody = (x: number, y: number, z: number, spriteSrc: string) => {
        let position = new Position(x, y)
        this.addComponent(new Friction(0.8))
        let velocity = new Velocity(0, 0)
        this.addComponent(velocity)

        let sprite = new Sprite(z, spriteSrc)
        this.addComponent(sprite)
        return sprite.loadingPromise.then(() => {
            this.addComponent(position)
            let hitbox = new Hitbox(position, sprite.sprite!!.width, sprite.sprite!!.height)
            this.addComponent(hitbox)
            this.addComponent(new CollisionBody(hitbox, velocity, 1, 0))

        })
    }

    addMouseGrab = () => {
        this.addComponent(new MouseInteractable(this.getComponent(Sprite)))
        this.addComponent(new MouseGrabbable())
    }
    
}

export {Entity}