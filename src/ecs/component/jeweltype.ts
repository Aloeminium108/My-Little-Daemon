import { Component } from "./component.js";

class JewelType extends Component {
    constructor(public color: Color | null = null, public special: SpecialProperty | null = null) {
        super ()
        if (this.special === null && this.color === null) this.color = JewelType.randomColor()
    }

    randomizeColor = (color: Color | null) => {
        let newColor
        do {
            newColor = JewelType.randomColor() as Color
        } while (newColor === color)
        this.color = newColor
    }

    static randomColor = () => {
        let colorLength = Object.keys(Color).length / 2
        return Math.floor(Math.random() * colorLength) as Color
    }
}

enum Color {
    RED,
    YELLOW,
    GREEN,
    BLUE,
}

enum SpecialProperty {

}

export {JewelType, Color, SpecialProperty}