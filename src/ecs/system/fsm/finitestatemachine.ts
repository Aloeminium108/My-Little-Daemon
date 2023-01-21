import { Automaton, EntityState } from "../../component/automaton.js";
import { Entity } from "../../entity/entity.js";
import { UnorderedSystem } from "../system.js";

abstract class FiniteStateMachine extends UnorderedSystem {

    // Define the behavior that corresponds to each state
    abstract behaviorMap: Map<EntityState, (entity: Entity) => void>

    public update = (interval: number) => {

        this.preAutomation(interval)

        // Execute the appropriate behavior for each automaton
        // based on its current state
        this.entities.forEach(entity => {
            let fsm = entity.getComponent(Automaton)
            fsm.update(interval)
            this.behaviorMap.get(fsm.currentState)?.(entity)
        })

        this.postAutomation(interval)
    }

    // If a finite state machine needs logic to execute
    // before or after executing the behavior for any
    // of its automata, these methods may be overridden
    protected preAutomation = (interval: number) => {}
    protected postAutomation = (interval: number) => {}
    
}

export {FiniteStateMachine}