import {Balloon} from './classes/Balloon.js'

const svg = document.querySelector('.game-svg')
const balloon = new Balloon(svg)

const deltaTime = 1/60
let prevTime = 0
let accumulatedTime = 0

function game(time){
  accumulatedTime += (time - prevTime) / 1000
  prevTime = time

  while(accumulatedTime > deltaTime){
    balloon.update(deltaTime)
    accumulatedTime -= deltaTime
  }

  requestAnimationFrame(game)
}

requestAnimationFrame(game)
