import { PetStats } from "./petstats.js"


class Pet {
    imageSrc: string

    name: string
    gender: string
    age: string
    weight: string

    stats: PetStats = new PetStats(1000)

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

    // feed = (food: Food) => {
    //     this.stats.feed(food)
    // }

    update = (interval: number) => {
        this.stats.update(interval)
    }
}

export { Pet }