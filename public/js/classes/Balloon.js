import {createBalloonSvg} from '../createBalloonSvg.js'
import {getRandom} from '../utils.js'

export class Balloon{
  constructor(ctx, speedCoef){
    const balloon = createBalloonSvg()
    this.svg = balloon.svg
    this.w = balloon.w
    this.h = balloon.h
    this.rx = balloon.rx
    this.ry = balloon.ry
    
    ctx.append(this.svg)

    this.ctxW = ctx.width.baseVal.value
    this.ctxH = ctx.height.baseVal.value

    this.x = getRandom(0, this.ctxW - this.w)
    this.y = this.ctxH

    this.setPosition()

    this.speed = Math.round(speedCoef/this.w)
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

  update(deltaTime, wind, destroyCallback){
    this.y -= this.speed * deltaTime
    this.x += wind
    if(this.x >= this.ctxW - this.w){
      this.x = this.ctxW - this.w
    }else if(this.x <= 0){
      this.x = 0
    }
    this.setPosition()
    if(this.y + this.h < 0) {
      this.destroy()
      destroyCallback(this.id)
    }
  }

  destroy(){
    this.svg.remove()
  }
}
