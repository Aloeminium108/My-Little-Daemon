class Pet {
    constructor() {
        this.hunger = 0;
        this.getHunger = () => {
            return this.hunger;
        };
        this.Feed = (nourishmentValue) => {
            this.hunger += nourishmentValue;
        };
        this.imageSrc = "../../assets/bird.png";
    }
}
export { Pet };
