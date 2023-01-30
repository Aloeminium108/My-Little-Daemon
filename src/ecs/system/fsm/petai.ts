import { PetLink } from "../../component/gameplay/petlink.js";
import { Automaton, EntityState } from "../../component/fsm/automaton.js";
import { Entity } from "../../entity/entity.js";
import { MouseSystem } from "../controls/mousesystem.js";
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