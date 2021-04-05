import {Balloon} from './Balloon.js'
import {Nail} from './Nail.js'
import {collisionDetect} from '../collision.js'

export class Game{
  constructor(){
    this.ctx = document.querySelector('.game-svg')
    this.balloons = new Map()
    this.nail = new Nail(this.ctx)
    this.createBalloon()
  }

  createBalloon(){
    const balloon = new Balloon(this.ctx)
    this.balloons.set(balloon.id, balloon)
  }

  update(deltaTime){
    this.balloons.forEach(b => b.update(deltaTime))

    const collidingIds = collisionDetect(
      this.nail.getNailPoint(), this.balloons
    )

    if(collidingIds.length){
      collidingIds.forEach(id => {
        this.balloons.get(id).destroy()
        this.balloons.delete(id)
      })
    }
  }
}
