import {createBalloonSvg, dimensions} from '../createBalloonSvg.js'
import {getRandom} from '../utils.js'

export class Balloon{
  constructor(ctx){
    this.svg = createBalloonSvg()
    ctx.append(this.svg)

    const ctxW = ctx.width.baseVal.value
    const ctxH = ctx.height.baseVal.value

    this.w = this.svg.width.baseVal.value
    this.h = this.svg.height.baseVal.value

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
      bx: this.x + dimensions.rx,
      by: this.y + dimensions.ry
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
