import { PetLink } from "../../component/gameplay/petlink.js";
import { Automaton, EntityState } from "../../component/fsm/automaton.js";
import { Entity } from "../../entity/entity.js";
import { MouseOverSystem } from "../controls/mouseoversystem.js";
import { FiniteStateMachine } from "./finitestatemachine.js";

class PetAI extends FiniteStateMachine {

    public componentsRequired = new Set([Automaton, PetLink])

    constructor() {
        super()
    }

    behaviorMap = new Map()
    // new Map([

    //     [EntityState.NEUTRAL, (entity: Entity) => {
    //         if (entity === this.mouseSystem.heldEntity) entity.getComponent(Automaton).changeState(EntityState.HAPPY)
    //     }],

    //     [EntityState.HAPPY, (entity: Entity) => {
    //         if (entity !== this.mouseSystem.heldEntity) entity.getComponent(Automaton).changeState(EntityState.NEUTRAL)
    //         entity.getComponent(PetLink).pet.increaseHappiness(1)
    //     }]

    // ])
    

}

export {PetAI}