import { Hitbox } from "../../component/hitbox.js";
import { JewelType } from "../../component/jeweltype.js";
import { Automaton, State } from "../../component/state.js";
import { Velocity } from "../../component/velocity.js";
import { Entity } from "../../entity/entity.js";
import { CollisionDetection } from "../collisiondetection.js";
import { FiniteStateMachine } from "./finitestatemachine.js";

class JewelBehavior extends FiniteStateMachine {

    behaviorMap = new Map([
        [State.FALLING, (entity: Entity) => {
            entity.getComponent(Velocity).dy += 0.5
        }],

        [State.MATCHED, (entity: Entity) => {
            let age = entity.getComponent(Automaton).age
            if (age >= 100) this.ecs?.removeEntity(entity)
        }],

        [State.UNMATCHED, (entity: Entity) => {
            let fsm = entity.getComponent(Automaton)
            let hitbox = entity.getComponent(Hitbox)
            let center = hitbox.center
            
            // Send out a short ray to see what gems are immediately
            // underneath.
            let rayDown = {
                x: center.x, 
                y: center.y + (hitbox.height)
            }

            let sensedDown = this.collisionDetection.senseAtPoint(
                rayDown.x, rayDown.y, this.componentsRequired
            )

            // If there are no gems underneath, or if the first gem
            // detected is in a FALLING state, change state to FALLING
            if (sensedDown.length === 0) {
                fsm.changeState(State.FALLING)
                return
            }

            if (sensedDown[0].getComponent(Automaton).currentState === State.FALLING) {
                fsm.changeState(State.FALLING)
                return
            }

            // Similarly send a short ray to see what gems are immediately
            // to the right
            let rayRight = {
                x: center.x + (hitbox.width), 
                y: center.y
            }

            let sensedRight = this.collisionDetection.senseAtPoint(
                rayRight.x, rayRight.y, this.componentsRequired
            )

            let jewelType = entity.getComponent(JewelType)

            // If the gem immediately to the right or down is the same color
            // save it and that gem to the appropriate map
            if (sensedRight[0].getComponent(JewelType).color === jewelType.color) {
                this.connectedGemsX.set(entity, sensedRight[0])
            }

            if (sensedDown[0].getComponent(JewelType).color === jewelType.color) {
                this.connectedGemsY.set(entity, sensedDown[0])
            }

        }],

        [State.SWAPPING, (entity: Entity) => {
            
        }],
        
    ])

    public componentsRequired = new Set([Automaton, JewelType])

    // Sets gems that are connected along the X and Y axis
    public connectedGemsX = new Map<Entity, Entity>()
    public connectedGemsY = new Map<Entity, Entity>()

    constructor(private collisionDetection: CollisionDetection) {
        super()
    }

    protected override preAutomation = (interval: number) => {
        this.connectedGemsX.clear()
        this.connectedGemsY.clear()
    }
    
}

export {JewelBehavior}