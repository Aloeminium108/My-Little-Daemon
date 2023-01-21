import { Bounds } from "../../component/bounds.js";
import { Hitbox } from "../../component/hitbox.js";
import { JewelType } from "../../component/jeweltype.js";
import { Automaton, EntityState } from "../../component/automaton.js";
import { Velocity } from "../../component/velocity.js";
import { Entity } from "../../entity/entity.js";
import { CollisionDetection } from "../collisiondetection.js";
import { FiniteStateMachine } from "./finitestatemachine.js";

class JewelBehavior extends FiniteStateMachine {

    public componentsRequired = new Set([Automaton, JewelType])

    // Sets gems that are connected along the X and Y axis
    public connectedGemsX = new Map<Entity, Entity>()
    public connectedGemsY = new Map<Entity, Entity>()

    behaviorMap = new Map([
        [EntityState.FALLING, (entity: Entity) => {
            let fsm = entity.getComponent(Automaton)
            let bounds = entity.getComponent(Bounds)

            if (fsm.currentState !== EntityState.FALLING) {
                entity.getComponent(Velocity).dy = 0
                fsm.changeState(EntityState.UNMATCHED)
                bounds.onGround = false
                return
            }

            if (bounds.onGround) {
                entity.getComponent(Velocity).dy = 0
                fsm.changeState(EntityState.UNMATCHED)
                bounds.onGround = false
                return
            }

            entity.getComponent(Velocity).dy += 0.5
        }],

        [EntityState.MATCHED, (entity: Entity) => {
            let age = entity.getComponent(Automaton).age
            if (age >= 100) {
                this.ecs?.removeEntity(entity)
            }
        }],

        [EntityState.UNMATCHED, (entity: Entity) => {
            let fsm = entity.getComponent(Automaton)
            let hitbox = entity.getComponent(Hitbox)
            let center = hitbox.center
            let ground = entity.getComponent(Bounds).yUpperBound
            
            // Send out a short ray to see what gems are immediately
            // underneath.
            let rayDown = {
                x: center.x, 
                y: center.y + (hitbox.height)
            }

            let sensedDown = this.collisionDetection.senseAtPoint(
                rayDown.x, rayDown.y
            )

            // Only check gems underneath if this gem isn't on the ground
            if (rayDown.y < ground) {

                // If there are no gems underneath, or if the first gem
                // detected is in a FALLING state, change state to FALLING
                if (sensedDown.length === 0) {
                    fsm.changeState(EntityState.FALLING)
                    return
                }

                if (sensedDown[0].getComponent(Automaton).currentState === EntityState.FALLING) {
                    fsm.changeState(EntityState.FALLING)
                    return
                }
            }

            if (entity.getComponent(Bounds).offScreen) return
            
            // Similarly send a short ray to see what gems are immediately
            // to the right
            let rayRight = {
                x: center.x + (hitbox.width), 
                y: center.y
            }

            let sensedRight = this.collisionDetection.senseAtPoint(
                rayRight.x, rayRight.y
            )

            let jewelType = entity.getComponent(JewelType)

            // If the gem immediately to the right or down is the same color
            // save it and that gem to the appropriate map
            if (sensedRight.length > 0 && 
                sensedRight[0].getComponent(Automaton).currentState === EntityState.UNMATCHED &&
                sensedRight[0].getComponent(JewelType).color === jewelType.color) {
                this.connectedGemsX.set(entity, sensedRight[0])
            }

            if (sensedDown.length > 0 && 
                sensedDown[0].getComponent(Automaton).currentState === EntityState.UNMATCHED &&
                sensedDown[0].getComponent(JewelType).color === jewelType.color) {
                this.connectedGemsY.set(entity, sensedDown[0])
            }

        }],

        [EntityState.SWAPPING, (entity: Entity) => {
            
        }],
        
    ])

    constructor(private collisionDetection: CollisionDetection) {
        super()
    }

    protected override preAutomation = (interval: number) => {
        this.connectedGemsX.clear()
        this.connectedGemsY.clear()
    }

    protected override postAutomation = (interval: number) => {
        let matches = new Set<Set<Entity>>
        this.connectedGemsX.forEach((gem2, gem1) => {
            let gem3 = this.connectedGemsX.get(gem2)
            if (gem3 !== undefined) {
                matches.add(new Set([gem1, gem2, gem3]))
            }
        })
        this.connectedGemsY.forEach((gem2, gem1) => {
            let gem3 = this.connectedGemsY.get(gem2)
            if (gem3 !== undefined) {
                matches.add(new Set([gem1, gem2, gem3]))
            }
        })

        matches = this.consolidateMatches(matches)

        matches.forEach(match => {
            match.forEach(gem => {
                gem.getComponent(Automaton).changeState(EntityState.MATCHED)
            })
        })
    }

    private consolidateMatches = (matches: Set<Set<Entity>>) => {
        let map = new Map<Entity, Set<Entity>>()
        let matchSet = new Set<Set<Entity>>()

        matches.forEach(match => {
            let overlappingMatches = new Set([match])
            match.forEach(gem => {
                if (map.has(gem)) {
                    overlappingMatches.add(map.get(gem)!!)
                }
            })

            let combinedMatch = new Set<Entity>()
            overlappingMatches.forEach(match => {
                matchSet.delete(match)
                match.forEach(gem => {
                    combinedMatch.add(gem)
                })
            })

            combinedMatch.forEach(gem => {
                map.set(gem, combinedMatch)
            })
            matchSet.add(combinedMatch)
        })

        return matchSet
    }
    
}

export {JewelBehavior}