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

    public destroyedGems = new Array<JewelType>()

    behaviorMap = new Map([
        [EntityState.FALLING, (entity: Entity) => {
            let fsm = entity.getComponent(Automaton)
            let bounds = entity.getComponent(Bounds)

            if (bounds.onGround) {
                entity.getComponent(Velocity).dy = 0
                fsm.changeState(EntityState.UNMATCHED)
                bounds.onGround = false
                return
            }

            entity.getComponent(Velocity).dy += 0.7
        }],

        [EntityState.MATCHED, (entity: Entity) => {
            let age = entity.getComponent(Automaton).age
            if (age >= 120) {
                this.destroyedGems.push(entity.getComponent(JewelType))
                this.ecs?.removeEntity(entity)
            }

            let jewelType = entity.getComponent(JewelType)
            let hitbox = entity.getComponent(Hitbox)
            
            let sensedDown = this.senseDown(hitbox)
            let sensedRight = this.senseRight(hitbox)

            this.connectDown(entity, jewelType, sensedDown)
            this.connectRight(entity, jewelType, sensedRight)
        }],

        [EntityState.UNMATCHED, (entity: Entity) => {
            let fsm = entity.getComponent(Automaton)
            let hitbox = entity.getComponent(Hitbox)
            
            let sensedDown = this.senseDown(hitbox)

            // Only check gems underneath if this gem isn't on the ground
            if (!entity.getComponent(Bounds).onGround) {
                // If there are no gems underneath, or if the first gem
                // detected is in a FALLING state, change state to FALLING
                if (sensedDown.length === 0 ||
                    sensedDown[0].getComponent(Automaton).currentState === EntityState.FALLING) {
                    fsm.changeState(EntityState.FALLING)
                    return
                }
            }

            let jewelType = entity.getComponent(JewelType)
            if (!jewelType.active) return
            
            let sensedRight = this.senseRight(hitbox)

            this.connectDown(entity, jewelType, sensedDown)
            this.connectRight(entity, jewelType, sensedRight)

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
                let fsm = gem.getComponent(Automaton)
                fsm.changeState(EntityState.MATCHED)
            })
        })

        this.entities.forEach(entity => {
            entity.getComponent(JewelType).active = true
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

    private senseDown = (hitbox: Hitbox) => {
        let center = hitbox.center

        let rayDown = {
            x: center.x, 
            y: center.y + (hitbox.height)
        }

        return this.collisionDetection.senseAtPoint(
            rayDown.x, rayDown.y
        )
    }

    private senseRight = (hitbox: Hitbox) => {
        let center = hitbox.center

        let rayRight = {
            x: center.x + (hitbox.width), 
            y: center.y
        }

        return this.collisionDetection.senseAtPoint(
            rayRight.x, rayRight.y
        )
    }
    
    private connectDown(entity: Entity, jewelType: JewelType, sensedDown: Array<Entity>) {
        if (sensedDown.length > 0 && 
        availableForMatching(sensedDown[0]) &&
        sensedDown[0].getComponent(JewelType).color === jewelType.color) {
            this.connectedGemsY.set(entity, sensedDown[0])
        }
    }

    private connectRight(entity: Entity, jewelType: JewelType, sensedRight: Array<Entity>) {
        if (sensedRight.length > 0 && 
        availableForMatching(sensedRight[0]) &&
        sensedRight[0].getComponent(JewelType).color === jewelType.color) {
            this.connectedGemsX.set(entity, sensedRight[0])
        }
    }
    
}

function availableForMatching(entity: Entity) {
    if (entity === undefined) return false
    let state = entity.getComponent(Automaton).currentState
    return state === EntityState.MATCHED || 
        state === EntityState.UNMATCHED
}

export {JewelBehavior}