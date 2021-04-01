import {Game} from './classes/Game.js'

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
