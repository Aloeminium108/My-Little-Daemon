import { Food } from "../entity/food"


class Pet {
    private hunger: number = 0

    imageSrc: string

    name: string
    gender: string
    age: string
    weight: string

    constructor() {
        this.imageSrc = '../../assets/bird.png'
        this.name = 'FunkyBird'
        this.gender = 'None'
        this.age = 'Eternal'
        this.weight = '83 trillion kilotons'
    }

    getHunger = () => {
        return this.hunger
    }

    feed = (food: Food) => {
        this.hunger += food.getNourishmentValue()
    }
}

export { Pet }