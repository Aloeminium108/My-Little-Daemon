import { GameState, GameStateTransition } from "./gamestate/gamestate.js"
import { HomeState } from "./gamestate/homestate.js"
import { StatMenuState } from "./gamestate/statmenustate.js"
import { Pet } from "./Pet/pet.js"
import { Mouse } from "./gamestate/mouse.js"
import { Match3State } from "./gamestate/match3state.js"
import { Sprite } from "./ecs/component/sprite.js"
import { LoadingState } from "./gamestate/loadingstate.js"

class Game {
    ctx: CanvasRenderingContext2D

    pet: Pet

    mouse: Mouse = new Mouse()

    lastFrameTimeStamp: DOMHighResTimeStamp | null = null

    private stateMap = new Map<GameStateTransition<GameState>, GameState>
    private currentState: GameState

    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!!

        this.pet = new Pet()

        this.currentState = new LoadingState(this)

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
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.pet.update(interval)
        this.currentState.update?.(interval)
        
        window.requestAnimationFrame(this.animate)
    }

    loadAssets = () => {
        let sources = [
            './assets/jewel-red.png',
            './assets/jewel-yellow.png',
            './assets/jewel-green.png',
            './assets/jewel-blue.png',
            './assets/jewel-purple.png',
            './assets/apple.png',
            './assets/ball.png',
            './assets/bird.png',
        ]
        let assets = sources.map(src => {
            let sprite = new Sprite(0, src)
            return sprite.loadingPromise
        })
        return assets
    }

    initializeStates = () => {
        this.addState(new HomeState(this))
        this.addState(new StatMenuState(this))
        this.addState(new Match3State(this))
    }

    addState = <T extends GameState>(state: GameState) => {
        this.stateMap.set(state.constructor as GameStateTransition<T>, state)
    }

    changeState = (state: GameStateTransition<GameState>) => {
        if (this.stateMap.has(state)) {
            this.currentState.pause()
            this.currentState = this.stateMap.get(state)!!
            this.currentState.resume()
        }
    }

    addCanvasListeners = () => {
        this.canvas.addEventListener('mousedown', (e) => this.mouse.pressed = true)
        this.canvas.addEventListener('mouseup', (e) => this.mouse.pressed = false)
        this.canvas.addEventListener('mousemove', (e) => this.mouse.move(e))
        this.canvas.addEventListener('mouseleave', (e) => this.mouse.pressed = false)
    }

    addButtonListeners = () => {
        let buttons = document.querySelectorAll('.button')
        buttons[0].addEventListener('click', (e) => {
            this.changeState(StatMenuState)
        })
        buttons[1].addEventListener('click', (e) => {
            this.currentState.foodButton?.()
        })
        buttons[2].addEventListener('click', (e) => {
            this.changeState(Match3State)
        })
    }

}

export { Game }