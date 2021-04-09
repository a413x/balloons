import {Balloon} from './Balloon.js'
import {Nail} from './Nail.js'
import {Wind} from './Wind.js'
import {Score} from './Score.js'
import {Level} from './Level.js'
import {Timer} from './Timer.js'
import {collisionDetect} from '../collision.js'

export class Game{
  constructor(){
    this.ctx = document.querySelector('.game-svg')
    this.balloons = new Map()
    this.nail = new Nail(this.ctx)
    this.wind = new Wind(this.ctx)
    this.wind.addWind()
    this.score = new Score()

    this.timeToNextBalloon = 0

    this.level = new Level()
    this.timer = new Timer()
  }

  createBalloon(){
    const balloon = new Balloon(this.ctx, this.level.params.speedCoef)
    this.balloons.set(balloon.id, balloon)
  }

  balloonsCreateInterval(deltaTime){
    if(this.levelOver) return
    this.timeToNextBalloon += deltaTime
    if(this.timeToNextBalloon > this.level.params.nextBalloonTime){
      this.createBalloon()
      this.timeToNextBalloon = 0
    }
  }

  balloonDestroy(id){
    this.balloons.get(id).destroy()
    this.balloons.delete(id)
  }

  endLevel(){
    this.levelOver = true
    if(this.balloons.size === 0){
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
    this.balloons.forEach(b => b.update(
      deltaTime,
      this.wind.calculateWindAffect(b),
      id => {
        this.score.update(false)
        this.balloonDestroy(id)
      }
    ))

    const collidingIds = collisionDetect(
      this.nail.getNailPoint(), this.balloons
    )

    if(collidingIds.length){
      collidingIds.forEach(id => {
        this.balloonDestroy(id)
        this.score.update(true)
      })
    }

    this.timer.update(deltaTime, () => this.endLevel())
    this.balloonsCreateInterval(deltaTime)
  }
}
