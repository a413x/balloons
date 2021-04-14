import {BalloonsHandler} from './BalloonsHandler.js'
import {Nail} from './Nail.js'
import {Wind} from './Wind.js'
import {Score} from './Score.js'
import {Level} from './Level.js'
import {Timer} from './Timer.js'
import {PlayButton} from './PlayButton.js'

export class Game{
  constructor(){
    this.ctx = document.getElementById('canvas').getContext('2d')
    this.nail = new Nail(this.ctx)
    this.wind = new Wind(this.ctx)
    this.score = new Score()
    this.level = new Level()
    this.timer = new Timer()
    this.playButton = new PlayButton(() => this.startGame())
    this.balloonsHandler = new BalloonsHandler(this.ctx)
    this.paused = true
  }
  startGame(){
    this.score.reset()
    this.paused = false
  }
  endLevel(){
    this.levelOver = true
    if(this.balloonsHandler.balloons.size === 0){
      this.levelOver = false
      this.levelChange()
    }
  }
  levelChange(){
    this.level.nextLevel()
    this.timer.enable = true
    this.paused = true
    this.playButton.showButton(this.level.levelNum)
  }
  update(deltaTime){
    if(this.paused) return
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
