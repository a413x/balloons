import {Balloon} from './Balloon.js'
import {Nail} from './Nail.js'
import {collisionDetect} from '../collision.js'
const roundTime = 60

export class Game{
  constructor(){
    this.ctx = document.querySelector('.game-svg')
    this.balloons = new Map()
    this.nail = new Nail(this.ctx)

    this.time = 0

    this.scoreDestroyed = 0
    this.scoreMissed = 0

    this.speedCoef = 5000
    this.nextBalloonTime = 3
    this.timeToNextBalloon = 0
  }

  createBalloon(){
    const balloon = new Balloon(this.ctx, this.speedCoef)
    this.balloons.set(balloon.id, balloon)
  }

  balloonsCreateInterval(deltaTime){
    this.timeToNextBalloon += deltaTime
    if(this.timeToNextBalloon > this.nextBalloonTime){
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
    }
  }

  updateScore(destroyed = null){
    if(destroyed === true) this.scoreDestroyed++
    else if(destroyed === false) this.scoreMissed++
    document.querySelector('.score-destroyed .value').textContent = this.scoreDestroyed
    document.querySelector('.score-missed .value').textContent = this.scoreMissed
  }

  resetScore(){
    this.scoreDestroyed = 0
    this.scoreMissed = 0
    this.updateScore()
  }

  update(deltaTime){
    this.balloons.forEach(b => b.update(
      deltaTime,
      id => {
        this.updateScore(false)
        this.balloonDestroy(id)
      }
    ))

    const collidingIds = collisionDetect(
      this.nail.getNailPoint(), this.balloons
    )

    if(collidingIds.length){
      collidingIds.forEach(id => {
        this.balloonDestroy(id)
        this.updateScore(true)
      })
    }

    this.timerInterval(deltaTime)
    this.balloonsCreateInterval(deltaTime)
  }
}
