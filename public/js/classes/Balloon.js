import {createBalloonSvg} from '../createBalloonSvg.js'
import {getRandom} from '../utils.js'

export class Balloon{
  constructor(ctx){
    const balloon = createBalloonSvg()
    this.svg = balloon.svg
    this.w = balloon.w
    this.h = balloon.h
    this.rx = balloon.rx
    this.ry = balloon.ry
    
    ctx.append(this.svg)

    const ctxW = ctx.width.baseVal.value
    const ctxH = ctx.height.baseVal.value

    this.x = getRandom(0, ctxW - this.w)
    this.y = ctxH

    this.setPosition()

    this.speed = getRandom(50, 100)
    this.id = Date.now()
  }

  setPosition(){
    this.svg.setAttribute('x', this.x)
    this.svg.setAttribute('y', this.y)
  }

  getCenterCoords(){
    return {
      bx: this.x + this.rx,
      by: this.y + this.ry
    }
  }

  update(deltaTime){
    this.y -= this.speed * deltaTime
    this.setPosition()
  }

  destroy(){
    this.svg.remove()
  }
}
