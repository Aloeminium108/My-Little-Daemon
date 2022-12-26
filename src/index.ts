import { GameState } from "./state/gamestate.js"
import { IntroState } from "./state/introstate.js"
import { State } from "./state/state.js"
import { Game } from "./game.js"


const canvas = document.querySelector('canvas')
var ctx = canvas?.getContext("2d")

if (canvas != undefined) {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth * 0.8
}

const gameState = new GameState(canvas!!)
const introState = new IntroState()

var currentState: State = introState
function changeState() {
    currentState = gameState
}

introState.addStateChange(changeState)

function animate() {

    ctx?.clearRect(0, 0, canvas!!.width, canvas!!.height)
    
    currentState.animate(ctx!!)
    
    window.requestAnimationFrame(animate)
}



canvas?.addEventListener('mousedown', function(e) {
    currentState.mouseDown(e)
})

canvas?.addEventListener('mouseup', function(e) {
    currentState.mouseUp(e)
})

canvas?.addEventListener('mousemove', function(e) {
    currentState.mouseMove(e)
})

canvas?.addEventListener('mouseleave', function(e) {
    currentState.mouseLeave(e)
})

animate()
