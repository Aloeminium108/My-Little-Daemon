import { GameState, GameStateTransition } from "./gamestate/gamestate.js"
import { HomeState } from "./gamestate/homestate.js"
import { StatMenuState } from "./gamestate/statmenustate.js"
import { Gender, Pet } from "./Pet/pet.js"
import { Mouse } from "./gamestate/mouse.js"
import { Match3State } from "./gamestate/minigame/match3state.js"
import { Sprite } from "./ecs/component/graphics/sprite.js"
import { LoadingState } from "./gamestate/loadingstate.js"
import { MinigameSelectState } from "./gamestate/minigame/minigameselect.js"
import { Minigame } from "./gamestate/minigame/minigame.js"

class Game {
    private ctxMain: CanvasRenderingContext2D
    private ctxSecondary: CanvasRenderingContext2D

    private minigames: Array<Minigame> = []

    pet: Pet

    mouse: Mouse = new Mouse()

    lastFrameTimeStamp: DOMHighResTimeStamp | null = null

    private stateMap = new Map<GameStateTransition<GameState>, GameState>
    currentState: GameState

    constructor(
        public mainCanvas: HTMLCanvasElement, 
        public secondaryCanvas: HTMLCanvasElement,
        public canvasContainer: HTMLDivElement
        ) {
        this.ctxMain = mainCanvas.getContext("2d")!!
        this.ctxSecondary = secondaryCanvas.getContext("2d")!!

        this.pet = new Pet(
            500,
            0,
            'Zeruel',
            0,
            Gender.PLUTO,
            './assets/pet-neutral.png'
        )

        this.currentState = new LoadingState(this, this.ctxMain)

        Promise.all(this.loadAssets()).then(() => {
            this.initializeStates()

            this.currentState = this.stateMap.get(HomeState)!!

            this.addCanvasListeners()
            this.addButtonListeners()
        })

        
    }

    animate = (currentFrameTimeStamp: DOMHighResTimeStamp) => {

        let lastFrameTimeStamp = this.lastFrameTimeStamp ?? currentFrameTimeStamp
        let interval = currentFrameTimeStamp - lastFrameTimeStamp
        this.lastFrameTimeStamp = currentFrameTimeStamp
        
        this.ctxMain.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height)
        this.ctxSecondary.clearRect(0, 0, this.secondaryCanvas.width, this.secondaryCanvas.height)

        this.pet.update(interval)
        this.currentState.update?.(interval)
        
        window.requestAnimationFrame(this.animate)
    }

    loadAssets = () => {
        let sources = [
            './assets/apple.png',
            './assets/ball.png',
            './assets/pet-happy.png',
            './assets/pet-happy.png',
            './assets/gems/jewel-blue-2.png',
            './assets/gems/jewel-green-2.png',
            './assets/gems/jewel-orange-3.png',
            './assets/gems/jewel-purple-2.png',
            './assets/gems/jewel-red-2.png',
            './assets/gems/jewel-yellow-2.png',
            './assets/gems/jewel-blue-bomb.png',
            './assets/gems/jewel-green-bomb.png',
            './assets/gems/jewel-orange-bomb.png',
            './assets/gems/jewel-purple-bomb.png',
            './assets/gems/jewel-red-bomb.png',
            './assets/gems/jewel-yellow-bomb.png',
            './assets/gems/jewel-color-bomb.png',
            './assets/gems/vertical-line-clear-blue.png',
            './assets/gems/vertical-line-clear-green.png',
            './assets/gems/vertical-line-clear-orange.png',
            './assets/gems/vertical-line-clear-purple.png',
            './assets/gems/vertical-line-clear-red.png',
            './assets/gems/vertical-line-clear-yellow.png',
            './assets/gems/horizontal-line-clear-blue.png',
            './assets/gems/horizontal-line-clear-green.png',
            './assets/gems/horizontal-line-clear-orange.png',
            './assets/gems/horizontal-line-clear-purple.png',
            './assets/gems/horizontal-line-clear-red.png',
            './assets/gems/horizontal-line-clear-yellow.png',
        ]
        let assets = sources.map(src => {
            let sprite = new Sprite(0, src)
            return sprite.loadingPromise
        })
        return assets
    }

    initializeStates = () => {
        this.addState(new HomeState(this, this.ctxMain))
        this.addState(new StatMenuState(this))

        this.initializeMinigames()

        this.addState(new MinigameSelectState(this, this.minigames))
    }

    initializeMinigames = () => {
        this.minigames = [
            new Match3State(this, this.ctxSecondary, this.canvasContainer),
        ]
        this.minigames.forEach(minigame => {
            this.addState(minigame)
        })
    }

    addState = <T extends GameState>(state: GameState) => {
        this.stateMap.set(state.constructor as GameStateTransition<T>, state)
    }

    changeState = (state: GameStateTransition<GameState>) => {
        if (this.stateMap.has(state) 
        && this.currentState !== this.stateMap.get(state)) {
            this.currentState.pause()
            this.currentState = this.stateMap.get(state)!!
            this.currentState.resume()
        }
    }

    addCanvasListeners = () => {
        this.mainCanvas.addEventListener('mousedown', (e) => this.mouse.pressed = true)
        this.mainCanvas.addEventListener('mouseup', (e) => this.mouse.pressed = false)
        this.mainCanvas.addEventListener('mousemove', (e) => this.mouse.move(e))
        this.mainCanvas.addEventListener('mouseleave', (e) => this.mouse.pressed = false)

        this.secondaryCanvas.addEventListener('mousedown', (e) => this.mouse.pressed = true)
        this.secondaryCanvas.addEventListener('mouseup', (e) => this.mouse.pressed = false)
        this.secondaryCanvas.addEventListener('mousemove', (e) => this.mouse.move(e))
        this.secondaryCanvas.addEventListener('mouseleave', (e) => this.mouse.pressed = false)
    }

    addButtonListeners = () => {
        let buttons = document.querySelectorAll('.button')
        buttons[0].addEventListener('click', (e) => {
            this.changeState(HomeState)
        })
        buttons[1].addEventListener('click', (e) => {
            this.changeState(StatMenuState)
        })
        buttons[2].addEventListener('click', (e) => {
            this.currentState.foodButton?.()
        })
        buttons[3].addEventListener('click', (e) => {
            // TOYS
        })
        buttons[4].addEventListener('click', (e) => {
            // HEAL
        })
        buttons[5].addEventListener('click', (e) => {
            this.changeState(MinigameSelectState)
        })
        buttons[6].addEventListener('click', (e) => {
            // STORE
        })
        buttons[7].addEventListener('click', (e) => {
            // BATH
        })
        buttons[8].addEventListener('click', (e) => {
            // SLEEP
        })
        buttons[9].addEventListener('click', (e) => {
            // SAVE
        })
    }

}

export { Game }