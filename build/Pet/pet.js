import { Time } from "../time.js";
class Pet {
    constructor(_hunger, _happiness, _name, _age, _gender, imageSrc) {
        this._hunger = _hunger;
        this._happiness = _happiness;
        this._name = _name;
        this._age = _age;
        this._gender = _gender;
        this.imageSrc = imageSrc;
        this.maxHunger = 1000;
        this.maxHappiness = 1000;
        this.timeElapsed = 0;
        this.updateInterval = Time.MINUTE;
        this.consume = (consumable) => {
            this._hunger += consumable.hunger;
            if (this._hunger > this.maxHunger)
                this._hunger = this.maxHunger;
        };
        this.update = (interval) => {
            this.timeElapsed += interval;
            if (this.timeElapsed < this.updateInterval) {
                return;
            }
            if (this._hunger > 0) {
                this._hunger--;
            }
            this.timeElapsed -= this.updateInterval;
        };
    }
    get hunger() {
        return (this._hunger / this.maxHunger) * 100;
    }
    get happiness() {
        return (this._happiness / this.maxHappiness) * 100;
    }
    get name() {
        return this._name;
    }
    get age() {
        return this._age;
    }
    get gender() {
        return getGenderIcon(this._gender);
    }
}
function getGenderIcon(gender) {
    switch (gender) {
        case Gender.MERCURY:
            return './assets/icons/gender/mercury-icon.png';
        case Gender.VENUS:
            return './assets/icons/gender/venus-icon.png';
        case Gender.EARTH:
            return './assets/icons/gender/earth-icon.png';
        case Gender.MARS:
            return './assets/icons/gender/mars-icon.png';
        case Gender.CERES:
            return './assets/icons/gender/ceres-icon.png';
        case Gender.JUPITER:
            return './assets/icons/gender/jupiter-icon.png';
        case Gender.SATURN:
            return './assets/icons/gender/saturn-icon.png';
        case Gender.URANUS:
            return './assets/icons/gender/uranus-icon.png';
        case Gender.NEPTUNE:
            return './assets/icons/gender/neptune-icon.png';
        case Gender.PLUTO:
            return './assets/icons/gender/pluto-icon.png';
        default:
            return './assets/icons/gender/mercury-icon.png';
    }
}
var Gender;
(function (Gender) {
    Gender[Gender["MERCURY"] = 0] = "MERCURY";
    Gender[Gender["VENUS"] = 1] = "VENUS";
    Gender[Gender["EARTH"] = 2] = "EARTH";
    Gender[Gender["MARS"] = 3] = "MARS";
    Gender[Gender["CERES"] = 4] = "CERES";
    Gender[Gender["JUPITER"] = 5] = "JUPITER";
    Gender[Gender["SATURN"] = 6] = "SATURN";
    Gender[Gender["URANUS"] = 7] = "URANUS";
    Gender[Gender["NEPTUNE"] = 8] = "NEPTUNE";
    Gender[Gender["PLUTO"] = 9] = "PLUTO";
})(Gender || (Gender = {}));
export { Pet, Gender };
