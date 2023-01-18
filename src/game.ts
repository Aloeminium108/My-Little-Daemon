import { State, StateTransition } from "./state/state.js"
import { GameState } from "./state/gamestate.js"
import { MenuState } from "./state/statmenustate.js"
import { Pet } from "./Pet/pet.js"
import { Mouse } from "./state/mouse.js"
import { Match3State } from "./state/match3state.js"
import { Sprite } from "./ecs/component/sprite.js"
import { LoadingState } from "./state/loadingstate.js"

class Game {
    ctx: CanvasRenderingContext2D

    pet: Pet

    mouse: Mouse = new Mouse()

    lastFrameTimeStamp: DOMHighResTimeStamp | null = null

    private stateMap = new Map<StateTransition<State>, State>
    private currentState: State

    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!!

        this.pet = new Pet()

        this.currentState = new LoadingState(this)

        Promise.all(this.loadAssets()).then(() => {
            this.initializeStates()

            this.currentState = this.stateMap.get(GameState)!!

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
            '../../assets/jewel-red.png',
            '../../assets/jewel-yellow.png',
            '../../assets/jewel-green.png',
            '../../assets/jewel-blue.png',
            '../../assets/jewel-purple.png',
            '../../assets/apple.png',
            '../../assets/ball.png',
            '../../assets/bird.png',
        ]
        let assets = sources.map(src => {
            let sprite = new Sprite(0, src)
            return sprite.loadingPromise
        })
        return assets
    }

    initializeStates = () => {
        this.addState(new GameState(this))
        this.addState(new MenuState(this))
        this.addState(new Match3State(this))
    }

    addState = <T extends State>(state: State) => {
        this.stateMap.set(state.constructor as StateTransition<T>, state)
    }

    changeState = (state: StateTransition<State>) => {
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
            this.changeState(MenuState)
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