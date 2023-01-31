import { Consumable } from "../ecs/component/gameplay/consumable.js"
import { Time } from "../time.js"

class Pet {

    private maxHunger: number = 1000
    private timeElapsed: number = 0
    private updateInterval: number = Time.MINUTE

    constructor(
        private _hunger: number,
        private _name: string,
        private _age: number,
        private _gender: Gender,
        public imageSrc: string
        ) {

    }

    consume = (consumable: Consumable) => {
        this._hunger += consumable.hunger
        if (this._hunger > this.maxHunger) this._hunger = this.maxHunger
    }

    update = (interval: number) => {
        this.timeElapsed += interval

        if (this.timeElapsed < this.updateInterval) {
            return
        }

        if (this._hunger > 0) {
            this._hunger--
        }
        
        this.timeElapsed -= this.updateInterval
    }

    public get hunger() {
        return this._hunger
    }

    public get name() {
        return this._name
    }

    public get age() {
        return this._age 
    }

    public get gender() {
        return getGenderIcon(this._gender)
    }

}

function getGenderIcon(gender: Gender) {
    switch (gender as Gender) {
        case Gender.MERCURY:
            return './assets/icons/gender/mercury-icon.png'
        case Gender.VENUS:
            return './assets/icons/gender/venus-icon.png'
        case Gender.EARTH:
            return './assets/icons/gender/earth-icon.png'
        case Gender.MARS:
            return './assets/icons/gender/mars-icon.png'
        case Gender.CERES:
            return './assets/icons/gender/ceres-icon.png'
        case Gender.JUPITER:
            return './assets/icons/gender/jupiter-icon.png'
        case Gender.SATURN:
            return './assets/icons/gender/saturn-icon.png'
        case Gender.URANUS:
            return './assets/icons/gender/uranus-icon.png'
        case Gender.NEPTUNE:
            return './assets/icons/gender/neptune-icon.png'
        case Gender.PLUTO:
            return './assets/icons/gender/pluto-icon.png'
        default:
            return './assets/icons/gender/mercury-icon.png'
    }
}

enum Gender {
    MERCURY,
    VENUS,
    EARTH,
    MARS,
    CERES,
    JUPITER,
    SATURN,
    URANUS,
    NEPTUNE,
    PLUTO
}



export { Pet, Gender }