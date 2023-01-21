import { PetLink } from "../../component/petlink.js";
import { Automaton, EntityState } from "../../component/automaton.js";
import { Entity } from "../../entity/entity.js";
import { MouseSystem } from "../mousesystem.js";
import { FiniteStateMachine } from "./finitestatemachine.js";

class PetAI extends FiniteStateMachine {

    public componentsRequired = new Set([Automaton, PetLink])

    constructor(private mouseSystem: MouseSystem) {
        super()
    }

    behaviorMap = new Map([

        [EntityState.NEUTRAL, (entity: Entity) => {
            if (entity === this.mouseSystem.heldEntity) entity.getComponent(Automaton).changeState(EntityState.HAPPY)
        }],

        [EntityState.HAPPY, (entity: Entity) => {
            if (entity !== this.mouseSystem.heldEntity) entity.getComponent(Automaton).changeState(EntityState.NEUTRAL)
        }]

    ])
    

}

export {PetAI}