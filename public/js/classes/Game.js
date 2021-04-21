import {BalloonsHandler} from './BalloonsHandler.js'
import {Nail} from './Nail.js'
import {Wind} from './Wind.js'
import {Score} from './Score.js'
import {Level} from './Level.js'
import {Timer} from './Timer.js'
import {PlayButton} from './PlayButton.js'
import {PauseButton} from './PauseButton.js'

const [START, RUNNING, ENDLEVEL] = [0,1,2]

export class Game{
  constructor(){
    this.ctx = document.getElementById('canvas').getContext('2d')
    this.nail = new Nail(this.ctx)
    this.wind = new Wind(this.ctx)
    this.score = new Score(() => this.missed())
    this.level = new Level()
    this.timer = new Timer()
    this.playButton = new PlayButton(() => { this.state = RUNNING })
    this.pauseButton = new PauseButton(() => {
      if(this.state === START) return
      this.paused = !this.paused
      this.pauseButton.setPause(this.paused)
    })
    this.balloonsHandler = new BalloonsHandler(this.ctx)
    this.state = START
    this.paused = false
    this.draw()
  }

  draw(){
    this.ctx.fillStyle = 'lightblue'
    this.ctx.fillRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
    this.balloonsHandler.drawBalloons()
    this.nail.draw()
  }

  missed(){
    if(this.score.scoreMissed >= this.level.params.balloonsToLoose){
      this.playButton.showButton(this.level)
      this.state = START
    }
  }

  update(deltaTime){
    this.draw()
    if(this.paused) return
    if(this.state === START) {
      this.score.reset()
      this.timer.reset()
      this.balloonsHandler.reset()
      return
    }
    else if(this.state === RUNNING){

      this.balloonsHandler.balloonsCreateInterval(deltaTime, this.level.params)
      this.timer.update(deltaTime, () => {this.state = ENDLEVEL})

    }else if (this.state === ENDLEVEL) {

      if(this.balloonsHandler.balloons.size === 0){
        this.level.nextLevel()
        this.playButton.showButton(this.level, this.score)
        this.state = START
      }

    }
    this.balloonsHandler.updateBalloons(deltaTime, this.wind, this.score)
    this.balloonsHandler.checkCollisions(this.nail, this.score)
    this.wind.windInterval(this.timer.timeSec)
  }
}
