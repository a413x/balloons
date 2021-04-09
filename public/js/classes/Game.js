import {Balloon} from './Balloon.js'
import {Nail} from './Nail.js'
import {Wind} from './Wind.js'
import {Score} from './Score.js'
import {collisionDetect} from '../collision.js'
import {nextLevel} from '../levels.js'
const roundTime = 60

export class Game{
  constructor(){
    this.ctx = document.querySelector('.game-svg')
    this.balloons = new Map()
    this.nail = new Nail(this.ctx)
    this.wind = new Wind(this.ctx)
    this.wind.addWind()
    this.score = new Score()

    this.time = 0
    this.timeToNextBalloon = 0

    this.levelChange()
  }

  createBalloon(){
    const balloon = new Balloon(this.ctx, this.level.speedCoef)
    this.balloons.set(balloon.id, balloon)
  }

  balloonsCreateInterval(deltaTime){
    if(this.levelOver) return
    this.timeToNextBalloon += deltaTime
    if(this.timeToNextBalloon > this.level.nextBalloonTime){
      this.createBalloon()
      this.timeToNextBalloon = 0
    }
  }

  balloonDestroy(id){
    this.balloons.get(id).destroy()
    this.balloons.delete(id)
  }

  timerInterval(deltaTime){
    const time = Math.round(this.time)
    if(time <= roundTime){
      this.time += deltaTime
      document.querySelector('.timer').textContent = roundTime - time
    }else{
      this.endLevel()
    }
  }

  endLevel(){
    this.levelOver = true
    if(this.balloons.size === 0){
      this.levelOver = false
      this.levelChange()
      this.time = 0
    }
  }

  levelChange(){
    this.score.reset()
    this.level = nextLevel()
    document.querySelector('.level .value').textContent = this.level.ind
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

    this.timerInterval(deltaTime)
    this.balloonsCreateInterval(deltaTime)
  }
}
