

class Pet {
    private hunger: number = 0
    imageSrc: string

    constructor() {
        this.imageSrc = "../../assets/bird.png"
    }

    getHunger = () => {
        return this.hunger
    }

    Feed = (nourishmentValue: number) => {
        this.hunger += nourishmentValue
    }
}

export { Pet }