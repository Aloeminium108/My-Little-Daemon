import { Automaton, State } from "../../component/state.js";
import { Entity } from "../../entity/entity.js";
import { UnorderedSystem } from "../system.js";

abstract class FiniteStateMachine extends UnorderedSystem {

    abstract behaviorMap: Map<State, (entity: Entity) => void>

    public update(interval: number): void {

        this.entities.forEach(entity => {
            let fsm = entity.getComponent(Automaton)
            fsm.update(interval)
            this.behaviorMap.get(fsm.currentState)?.(entity)
        })
    }
    
}

export {FiniteStateMachine}