import { Bounds } from "../../component/bounds.js";
import { Hitbox } from "../../component/hitbox.js";
import { JewelType, SpecialProperty } from "../../component/jeweltype.js";
import { Automaton, EntityState } from "../../component/automaton.js";
import { Velocity } from "../../component/velocity.js";
import { Entity } from "../../entity/entity.js";
import { CollisionDetection } from "../collisiondetection.js";
import { FiniteStateMachine } from "./finitestatemachine.js";
import { GemGrabSystem } from "../gemgrabsystem.js";
import { Position } from "../../component/position.js";
import { Jewel } from "../../entity/puzzle/jewel.js";
import { CollisionBody } from "../../component/collisionbody.js";

const EPSILON = 0.001

class JewelBehavior extends FiniteStateMachine {

    public componentsRequired = new Set([Automaton, JewelType, CollisionBody])

    // Sets gems that are connected along the X and Y axis
    public connectedGemsX = new Map<Entity, Entity>()
    public connectedGemsY = new Map<Entity, Entity>()

    public destroyedGems = new Array<JewelType>()

    behaviorMap = new Map([
        [EntityState.FALLING, (entity: Entity) => {
            let fsm = entity.getComponent(Automaton)
            let body = entity.getComponent(CollisionBody)

            if (body.onGround) {
                body.dy = 0
                fsm.changeState(EntityState.UNMATCHED)
                body.immovable = true
                body.onGround = false
                return
            }

            entity.getComponent(Velocity).dy += 1.5
        }],

        [EntityState.MATCHED, (entity: Entity) => {
            let age = entity.getComponent(Automaton).age
            let jewelType = entity.getComponent(JewelType)
            if (age >= 120) {
                this.destroyedGems.push(jewelType)

                if (jewelType.special !== null) {
                    this.gemsplosion(entity, jewelType.special)
                }

                if (jewelType.conversion !== null) {

                    if (jewelType.conversion === SpecialProperty.COLORBOMB) jewelType.color = null

                    let bounds = entity.getComponent(Bounds)
                    let position = entity.getComponent(Position)
                    let replacementJewel = new Jewel(
                        position.x, 
                        position.y, 
                        new JewelType(jewelType.color, jewelType.conversion
                    ))
                    replacementJewel.addComponent(bounds)
                    this.ecs?.addEntity(replacementJewel)
                }

                this.ecs?.removeEntity(entity)
            }

            if (!jewelType.active || jewelType.color === null) return

            let hitbox = entity.getComponent(Hitbox)
            
            let sensedDown = this.senseDown(hitbox)
            let sensedRight = this.senseRight(hitbox)

            this.connectDown(entity, jewelType, sensedDown)
            this.connectRight(entity, jewelType, sensedRight)
        }],

        [EntityState.UNMATCHED, (entity: Entity) => {
            let fsm = entity.getComponent(Automaton)
            let hitbox = entity.getComponent(Hitbox)
            let body = entity.getComponent(CollisionBody)

            let sensedDown = this.senseDown(hitbox)

            // Only check gems underneath if this gem isn't on the ground
            if (!body.onGround) {
                // If there are no gems underneath, or if the first gem
                // detected is in a FALLING state, change state to FALLING
                if (sensedDown.length === 0 ||
                    sensedDown[0].getComponent(Automaton).currentState === EntityState.FALLING) {
                    fsm.changeState(EntityState.FALLING)
                    body.immovable = false
                    return
                }
            }

            let jewelType = entity.getComponent(JewelType)
            if (!jewelType.active || jewelType.color === null) return
            
            let sensedRight = this.senseRight(hitbox)

            this.connectDown(entity, jewelType, sensedDown)
            this.connectRight(entity, jewelType, sensedRight)

        }],

        [EntityState.SWAPPING, (entity: Entity) => {
            
        }],
        
    ])

    constructor(private collisionDetection: CollisionDetection, gemGrabSystem: GemGrabSystem) {
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

            let specialMatch = this.checkMatchType(match)

            if (specialMatch === null) return
            
            let matchArray = Array.from(match)
            matchArray.sort((a, b) => {
                let aPos = a.getComponent(Position)
                let bPos = b.getComponent(Position)
                return (aPos.x - bPos.x) + (aPos.y - bPos.y)
            })

            matchArray[Math.floor(matchArray.length/2)].getComponent(JewelType).conversion = specialMatch
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
    
    private checkMatchType = (match: Set<Entity>) => {
        if (match.size === 3) return null 

        if (match.size === 4) {
            let arrayForm = Array.from(match)
            if (Math.abs(arrayForm[0].getComponent(Position).x - arrayForm[1].getComponent(Position).x) < EPSILON) {
                return SpecialProperty.H_LINECLEAR
            } else {
                return SpecialProperty.V_LINECLEAR
            }
        }

        let counter = 0
        match.forEach(gem => {
            if (this.connectedGemsX.has(gem) &&
            match.has(this.connectedGemsX.get(gem)!!)) counter++
        })

        if (counter >= 4 || match.size - counter >= 4) return SpecialProperty.COLORBOMB
        
        return SpecialProperty.BOMB

    }

    private gemsplosion = (entity: Entity, special: SpecialProperty) => {

        let center = entity.getComponent(Hitbox).center
        let position: Position
        let width, height: number
        let bounds: Bounds

        switch (special as SpecialProperty) {
            case SpecialProperty.BOMB:
                position = new Position(center.x - Jewel.width, center.y - Jewel.width)
                width = Jewel.width * 2
                height = Jewel.width * 2
                break
            case SpecialProperty.H_LINECLEAR:
                bounds = entity.getComponent(Bounds)
                position = new Position(bounds.xLowerBound, center.y)
                width = bounds.xUpperBound - bounds.xLowerBound
                height = 0
                break
            case SpecialProperty.V_LINECLEAR:
                bounds = entity.getComponent(Bounds)
                position = new Position(center.x, bounds.yLowerBound)
                width = 0
                height = bounds.yUpperBound - bounds.yLowerBound
                break
            default:
                position = entity.getComponent(Position)
                width = 0
                height = 0
        }

        let hitbox = new Hitbox(position, width, height)
        let blastedGems = this.collisionDetection.senseWithHitbox(hitbox)

        blastedGems.forEach(blastedGem => {
            blastedGem.getComponent(Automaton).changeState(EntityState.MATCHED)
        })

    }

}

function availableForMatching(entity: Entity) {
    if (entity === undefined) return false
    let state = entity.getComponent(Automaton).currentState
    return state === EntityState.MATCHED || 
        state === EntityState.UNMATCHED
}

export {JewelBehavior}