import { Jewel } from "../entity/puzzle/jewel.js";
import { Component } from "./component.js";
 
class GemSlot extends Component {

    constructor(public jewel: Jewel){
        super()
    }

}

export {GemSlot}