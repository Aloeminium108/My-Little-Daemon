class PetStats {

    private hunger: number
    private maxHunger: number = 100

    constructor(hunger: number) {
        this.hunger = hunger
    }

    feed(nourishmentValue: number) {
        this.hunger += nourishmentValue
        if (this.hunger > this.maxHunger) {
            this.hunger = this.maxHunger
        }
    }

    update() {
        this.hunger--
    }

}


export { PetStats }