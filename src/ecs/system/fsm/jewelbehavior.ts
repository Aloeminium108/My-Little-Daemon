import { Hitbox } from "../../component/hitbox.js";
import { JewelType } from "../../component/jeweltype.js";
import { Automaton, State } from "../../component/state.js";
import { Entity } from "../../entity/entity.js";
import { CollisionDetection } from "../collisiondetection.js";
import { FiniteStateMachine } from "./finitestatemachine.js";

class JewelBehavior extends FiniteStateMachine {

    behaviorMap = new Map([
        [State.FALLING, (entity: Entity) => {
            
        }],

        [State.MATCHED, (entity: Entity) => {
            let age = entity.getComponent(Automaton).age
            if (age >= 100) this.ecs?.removeEntity(entity)
        }],

        [State.UNMATCHED, (entity: Entity) => {
            let fsm = entity.getComponent(Automaton)
            let hitbox = entity.getComponent(Hitbox)
            let center = hitbox.center
            let rayRight = {
                x: center.x + (hitbox.width), 
                y: center.y
            }
            let rayDown = {
                x: center.x, 
                y: center.y + (hitbox.height)
            }

            let sensedDown = this.collisionDetection.senseAtPoint(
                rayDown.x, rayDown.y, this.componentsRequired
            )

            if (sensedDown.length === 0) {
                fsm.changeState(State.FALLING)
                return
            }

            if (sensedDown[0].getComponent(Automaton).currentState === State.FALLING) {
                fsm.changeState(State.FALLING)
                return
            }



        }]
        
    ])

    public componentsRequired = new Set([Automaton, JewelType])

    constructor(private collisionDetection: CollisionDetection) {
        super()
    }
    
}