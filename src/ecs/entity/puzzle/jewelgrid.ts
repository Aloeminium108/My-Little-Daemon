import { Bounds } from "../../component/bounds.js";
import { JewelType } from "../../component/jeweltype.js";
import { Position } from "../../component/position.js";
import { Sprite } from "../../component/sprite.js";
import { Entity } from "../entity.js";
import { Jewel } from "./jewel.js";
import { JewelGenerator } from "./jewelgenerator.js";
import { ComboCounter, Scoreboard } from "./scoreboard.js";

class JewelGrid extends Entity {

    constructor(x: number, y: number, numColumns: number, numRows: number) {

        super()

        // for (let i = 0; i < numColumns + 2; i++) {

        //     if (i !== 0 && i !== numColumns + 1) {
        //         let generator = new JewelGenerator(x + (i * Jewel.width), y)
        //         generator.addComponent(new Bounds(x + Jewel.width, x + Jewel.width + (Jewel.width * numColumns), y, y + Jewel.width + (Jewel.width * numRows), 0))
        //         this.childEntities.add(generator)
        //     }
            
        //     for (let j = 0; j < numRows + 2; j++) {


        //         if (i !== 0 
        //             && i !== numColumns + 1
        //             && j !== 0
        //             && j !== numRows + 1
        //             ) {

        //             let backgroundTile = new JewelGridTile(x + (i * Jewel.width), y + (j * Jewel.width), TileType.BACKGROUND)
        //             this.childEntities.add(backgroundTile)

        //             let gem = new Jewel(x + (i * Jewel.width), y + (j * Jewel.width), new JewelType())
        //             gem.addComponent(new Bounds(x + Jewel.width, x + Jewel.width + (Jewel.width * numColumns), y, y + Jewel.width + (Jewel.width * numRows), 0))
        //             this.childEntities.add(gem)

        //         } else {

        //             let tileType: TileType

        //             if (i === 0) {
        //                 if (j === 0) {
        //                     tileType = TileType.TOP_LEFT
        //                 } else if (j === numRows + 1) {
        //                     tileType = TileType.BOTTOM_LEFT
        //                 } else {
        //                     tileType = TileType.LEFT
        //                 }
        //             } else if (i === numColumns + 1) {
        //                 if (j === 0) {

        //                     let scorePanel = new ScorePanel(x + (i * Jewel.width), y + (j * Jewel.width))
        //                     this.childEntities.add(scorePanel)

        //                     tileType = TileType.TOP_RIGHT
        //                 } else if (j === numRows + 1) {
        //                     tileType = TileType.BOTTOM_RIGHT
        //                 } else {
        //                     tileType = TileType.RIGHT
        //                 }
        //             } else if (j === 0) {
        //                 tileType = TileType.TOP
        //             } else {
        //                 tileType = TileType.BOTTOM
        //             }

        //             let borderTile = new JewelGridTile(x + (i * Jewel.width), y + (j * Jewel.width), tileType)
        //             this.childEntities.add(borderTile)
        //         }
                
        //     }
        // }

        for (let i = 0; i < numColumns; i++) {

            if (i !== 0 && i !== numColumns + 1) {
                let generator = new JewelGenerator(x + (i * Jewel.width), y - Jewel.width)
                generator.addComponent(new Bounds(x, x + (Jewel.width * numColumns), y - Jewel.width, y + (Jewel.width * numRows), 0))
                this.childEntities.add(generator)
            }
            
            for (let j = 0; j < numRows; j++) {
                    let gem = new Jewel(x + (i * Jewel.width), y + (j * Jewel.width), new JewelType())
                    gem.addComponent(new Bounds(x, x + (Jewel.width * numColumns), y - Jewel.width, y + (Jewel.width * numRows), 0))
                    this.childEntities.add(gem)

            } 
                
        }
    }
}

class JewelGridTile extends Entity {
 
    constructor(x: number, y: number, tileType: TileType) {
        super()
        this.addComponent(new Position(x, y))
        let layer = tileType === TileType.BACKGROUND ? 0 : 10
        let spriteSrc = getImageSrc(tileType)
        this.addComponent(new Sprite(layer, spriteSrc))
    }

}

function getImageSrc(tileType: TileType) {
    switch (tileType as TileType) {
        case TileType.BACKGROUND:
            return './assets/gems/jewel-frame-background.png'
        case TileType.TOP:
            return './assets/gems/jewel-frame-top.png'
        case TileType.BOTTOM:
            return './assets/gems/jewel-frame-bottom.png'
        case TileType.LEFT:
            return './assets/gems/jewel-frame-left.png'
        case TileType.RIGHT:
            return './assets/gems/jewel-frame-right.png'
        case TileType.TOP_LEFT:
            return './assets/gems/jewel-frame-top-left.png'
        case TileType.TOP_RIGHT:
            return './assets/gems/jewel-frame-top-right.png'
        case TileType.BOTTOM_LEFT:
            return './assets/gems/jewel-frame-bottom-left.png'
        case TileType.BOTTOM_RIGHT:
            return './assets/gems/jewel-frame-bottom-right.png'
    }
}

enum TileType {
    BACKGROUND,
    TOP,
    BOTTOM,
    LEFT,
    RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
}

class ScorePanel extends Entity {
    constructor(x: number, y: number) {
        super()
        this.addComponent(new Position(x, y))
        let spriteSrc = './assets/gems/score-panel.png'
        this.addComponent(new Sprite(11, spriteSrc))

        let scoreDisplay = new Scoreboard(x + 30, y + 150)
        this.childEntities.add(scoreDisplay)

        let comboDisplay = new ComboCounter(x + 30, y + 300)
        this.childEntities.add(comboDisplay)
    } 
}

export {JewelGrid}