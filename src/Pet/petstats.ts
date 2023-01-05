import { Food } from "../entity/food.js"

class PetStats {

    private hunger: number
    private maxHunger: number = 1000
    private timeElapsed: number = 0
    private updateInterval: number = 1000

    constructor(hunger: number) {
        this.hunger = hunger
    }

    feed(food: Food) {
        this.hunger += food.getNourishmentValue()
        if (this.hunger > this.maxHunger) {
            this.hunger = this.maxHunger
        }
    }

    update(interval: number) {
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