import { PetLink } from "../../component/pet.js";
import { Automaton, State } from "../../component/state.js";
import { Entity } from "../../entity/entity.js";
import { MouseSystem } from "../mousesystem.js";
import { FiniteStateMachine } from "./finitestatemachine.js";

class PetAI extends FiniteStateMachine {

    public componentsRequired = new Set([Automaton, PetLink])

    constructor(private mouseSystem: MouseSystem) {
        super()
    }

    behaviorMap = new Map([

        [State.NEUTRAL, (entity: Entity) => {
            if (entity === this.mouseSystem.heldEntity) entity.getComponent(Automaton).changeState(State.HAPPY)
        }],

        [State.HAPPY, (entity: Entity) => {
            if (entity !== this.mouseSystem.heldEntity) entity.getComponent(Automaton).changeState(State.NEUTRAL)
        }]

    ])
    

}

export {PetAI}