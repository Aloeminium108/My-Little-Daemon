import { Gravity } from "../component/gravity.js";
import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { UnorderedSystem } from "./system.js";

class GravitySystem extends UnorderedSystem {

    public componentsRequired =  new Set([Position, Gravity, Velocity])

    update = (interval: number) => {
        this.entities.forEach(entity => {
            entity.getComponent(Velocity).dy += 1
        })
    }
    
}

export {GravitySystem}