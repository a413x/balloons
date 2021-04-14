import {BalloonsHandler} from './BalloonsHandler.js'
import {Nail} from './Nail.js'
import {Wind} from './Wind.js'
import {Score} from './Score.js'
import {Level} from './Level.js'
import {Timer} from './Timer.js'

export class Game{
  constructor(){
    this.ctx = document.getElementById('canvas').getContext('2d')
    this.nail = new Nail(this.ctx)
    this.wind = new Wind(this.ctx)
    this.score = new Score()
    this.level = new Level()
    this.timer = new Timer()
    this.balloonsHandler = new BalloonsHandler(this.ctx)
  }
  endLevel(){
    this.levelOver = true
    if(this.balloonsHandler.balloons.size === 0){
      this.levelOver = false
      this.levelChange()
    }
  }
  levelChange(){
    this.score.reset()
    this.level.nextLevel()
    this.timer.enable = true
  }
  update(deltaTime){
    this.balloonsHandler.updateBalloons(deltaTime, this.wind, this.score)
    this.balloonsHandler.checkCollisions(this.nail, this.score)
    this.balloonsHandler.balloonsCreateInterval(
      deltaTime, this.level.params, !this.levelOver
    )
    this.wind.windInterval(this.timer.timeSec)
    this.timer.update(deltaTime, () => this.endLevel())
    this.draw()
  }
  draw(){
    this.ctx.fillStyle = 'lightblue'
    this.ctx.fillRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
    this.balloonsHandler.drawBalloons()
    this.nail.draw()
  }
}
