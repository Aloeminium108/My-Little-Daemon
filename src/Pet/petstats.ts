import { Food } from "../entity/food"

class PetStats {

    private hunger: number
    private maxHunger: number = 100

    constructor(hunger: number) {
        this.hunger = hunger
    }

    feed(food: Food) {
        this.hunger += food.getNourishmentValue()
        if (this.hunger > this.maxHunger) {
            this.hunger = this.maxHunger
        }
    }

    update() {
        this.hunger--
    }

}


export { PetStats }