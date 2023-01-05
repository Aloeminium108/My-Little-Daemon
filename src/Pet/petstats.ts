import { Food } from "../entity/food"

class PetStats {

    private hunger: number
    private maxHunger: number = 100
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
        console.log("Time elapsed:", this.timeElapsed)
        if (this.timeElapsed >= this.updateInterval) {
            console.log("Update!")
            this.hunger--
            this.timeElapsed -= this.updateInterval
        }
        
    }

    getHunger() {
        return this.hunger
    }

}


export { PetStats }