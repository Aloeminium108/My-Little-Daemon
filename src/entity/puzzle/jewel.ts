import { Body } from "../body/body.js";
import { PhysicsBody } from "../body/physicsbody.js";
import { Entity } from "../entity.js";


class Jewel {

    static width: number = 50

    mouseOver = 'grab'
    mouseGrab = 'grabbing'

    type: JewelType

    constructor(type: JewelType | null = null) {
        this.type = type ?? Jewel.randomType()
    }


    drawBody = (ctx: CanvasRenderingContext2D) => {
        return (x: number, y: number) => {
            ctx.fillStyle = this.type.color
            ctx.fillRect(x, y, Jewel.width, Jewel.width)
        }
    }

    static randomType = () => {
        let colorLength = Object.keys(Color).length
        let randColor = Object.keys(Color)[Math.floor(Math.random() * colorLength)] as Color
        return { color: randColor }
    }

}

enum Color {
    RED = '#FF0000',
    //ORANGE = '#FF7F00',
    YELLOW = '#FFFF00',
    GREEN = '#00FF00',
    BLUE = '#0000FF',
    //INDIGO = '#4B0082',
    //VIOLET = '#9400D3'
}

enum SpecialProperty {

}

type JewelType = {
    color: Color
    specialProperty?: SpecialProperty
}

export { Jewel, Color }