import { Entity } from "./entity.js"
import { Food } from "./food.js"
import { PetEntity } from "./petentity.js"

class EntityList {
    private petEntity: PetEntity
    private toys: Array<Entity> = []
    private food: Array<Food> = []
    private entityList: Array<Array<Entity>>

    constructor(petEntity: PetEntity) {
        this.petEntity = petEntity
        this.entityList = [[petEntity], this.toys, this.food]
    }

    fullList = () => {
        return this.entityList.flat()
    }

    getPet = () => {
        return this.petEntity
    }

    getToys = () => {
        return this.toys
    }

    getFood = () => {
        return this.food
    }

    getSimpleEntities = () => {
        return [this.toys, this.food].flat()
    }

    addToy = (toy: Entity) => {
        this.toys.push(toy)
    }

    addFood = (food: Food) => {
        this.food.push(food)
    }

    removeToy = (index: number) => {
        if (index > -1 && index < this.toys.length) {
            this.toys.splice(index, 1)
        }
    }

    removeFood = (index: number) => {
        if (index > -1 && index < this.food.length) {
            this.food.splice(index, 1)
        }
    }


}

export { EntityList }

