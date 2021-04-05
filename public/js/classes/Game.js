import {Balloon} from './Balloon.js'
import {Mouse} from './Mouse.js'
import {collisionDetect} from '../collision.js'

export class Game{
  constructor(){
    this.ctx = document.querySelector('.game-svg')
    this.balloons = new Map()
    this.mousePos = {nx: 0, ny: 0}
    new Mouse((pos) => this.mouseMove(pos), this.ctx)
    this.createBalloon()
  }

  mouseMove(pos){
    this.mousePos.nx = pos.x
    this.mousePos.ny = pos.y
  }

  createBalloon(){
    const balloon = new Balloon(this.ctx)
    this.balloons.set(balloon.id, balloon)
  }

  update(deltaTime){
    this.balloons.forEach(b => b.update(deltaTime))

    const collidingIds = collisionDetect(this.mousePos, this.balloons)

    if(collidingIds.length){
      collidingIds.forEach(id => {
        this.balloons.get(id).destroy()
        this.balloons.delete(id)
      })
    }
  }
}
