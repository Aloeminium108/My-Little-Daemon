import { Food } from "../entity/food.js"
import { PetStats } from "./petstats.js"


class Pet {
    private hunger: number = 0

    imageSrc: string

    name: string
    gender: string
    age: string
    weight: string

    stats: PetStats = new PetStats(100)

    constructor() {
        this.imageSrc = '../../assets/bird.png'
        this.name = 'FunkyBird'
        this.gender = 'None'
        this.age = 'Eternal'
        this.weight = '83 trillion kilotons'
    }

    getHunger = () => {
        return this.stats.getHunger()
    }

    feed = (food: Food) => {
        this.stats.feed(food)
    }
}

export { Pet }