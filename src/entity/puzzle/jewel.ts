import { Body } from "../body/body.js";
import { GemBody } from "../body/gembody.js";
import { Entity } from "../entity.js";


class Jewel implements Entity {

    static width: number = 50

    body: GemBody

    mouseOver = 'grab'
    mouseHold = 'grabbing'

    type: JewelType

    constructor(x: number, y: number, type: JewelType | null = null) {
        this.type = type ?? Jewel.randomType()
        this.body = new GemBody(x, y, Jewel.width, Jewel.width)
    }

    getBody = () => {
        return this.body
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = this.type.color
        ctx.fillRect(this.body.getX(), this.body.getY(), Jewel.width, Jewel.width)
    }

    getMouseOver = () => {
        return this.mouseOver
    }

    getMouseHold = () => {
        return this.mouseHold
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