import { Jewel } from "../entity/puzzle/jewel.js";
import { Component } from "./component.js";
import { JewelType } from "./jeweltype.js";
 
class GemSlot extends Component {

    public activated: boolean = false

    public open: boolean = false

    constructor(public jewel: Jewel | null, public x: number, public y: number){
        super()
    }

    public getJewelColor = () => {
        return this.jewel?.getComponent(JewelType).color ?? null
    }



}

export {GemSlot}