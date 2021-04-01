import {Balloon} from './Balloon.js'
import {Mouse} from './Mouse.js'

export class Game{
  constructor(){
    this.ctx = document.querySelector('.game-svg')
    this.balloons = []

    new Mouse(this.mouseMove, this.ctx)
    this.createBalloon()
  }

  mouseMove(pos){
    
  }

  createBalloon(){
    this.balloons.push(new Balloon(this.ctx))
  }

  update(deltaTime){
    this.balloons.forEach(b => b.update(deltaTime))
  }
}
