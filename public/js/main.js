import {Game} from './classes/Game.js'
import {onResize} from './resize.js'

const gameObj = new Game()

const deltaTime = 1/60
let prevTime = 0
let accumulatedTime = 0

function gameLoop(time){
  accumulatedTime += (time - prevTime) / 1000
  prevTime = time

  while(accumulatedTime > deltaTime){
    gameObj.update(deltaTime)
    accumulatedTime -= deltaTime
  }

  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)

onResize()
window.addEventListener('resize', onResize)
