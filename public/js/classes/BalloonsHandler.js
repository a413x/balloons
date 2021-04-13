import {Balloon} from './Balloon.js'
import {collisionDetect} from '../collision.js'
export class BalloonsHandler{
  constructor(ctx){
    this.ctx = ctx
    this.balloons = new Map()
    this.timeToNextBalloon = 0
  }
  createBalloon(speedCoef){
    const balloon = new Balloon(this.ctx, speedCoef)
    this.balloons.set(balloon.id, balloon)
  }
  balloonDestroy(id){
    this.balloons.get(id).destroy()
    this.balloons.delete(id)
  }
  balloonsCreateInterval(deltaTime, params, enable){
    if(!enable) return
    this.timeToNextBalloon += deltaTime
    if(this.timeToNextBalloon > params.nextBalloonTime){
      this.createBalloon(params.speedCoef)
      this.timeToNextBalloon = 0
    }
  }
  updateBalloons(deltaTime, wind, score){
    this.balloons.forEach(b => b.update(
      deltaTime,
      wind.calculateWindAffect(b),
      id => {
        score.update(false)
        this.balloonDestroy(id)
      }
    ))
  }
  checkCollisions(nail, score){
    const collidingIds = collisionDetect(
      nail.getNailPoint(), this.balloons
    )
    if(collidingIds.length){
      collidingIds.forEach(id => {
        this.balloonDestroy(id)
        score.update(true)
      })
    }
  }
  drawBalloons(){
    this.balloons.forEach(b => b.draw())
  }
}
