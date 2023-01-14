import { Consumable } from "../ecs/component/consumable.js"
import { Time } from "../time.js"

class PetStats {

    private hunger: number
    private maxHunger: number = 1000
    private timeElapsed: number = 0
    private updateInterval: number = Time.MINUTE

    constructor(hunger: number) {
        this.hunger = hunger
    }

    consume = (consumable: Consumable) => {
        this.hunger += consumable.hunger
        if (this.hunger > this.maxHunger) this.hunger = this.maxHunger
    }

    update = (interval: number) => {
        this.timeElapsed += interval

        if (this.timeElapsed < this.updateInterval) {
            return
        }

        if (this.hunger > 0) {
            this.hunger--
        }
        
        this.timeElapsed -= this.updateInterval
    }

    getHunger() {
        return this.hunger
    }

}


export { PetStats }