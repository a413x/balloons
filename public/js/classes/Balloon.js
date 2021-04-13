import {drawBalloon} from '../textures/drawBalloon.js'
import {getRandom, createRandomDimensions, getRandomColor} from '../utils.js'

export class Balloon{
  constructor(ctx, speedCoef){
    this.color = getRandomColor()
    this.dim = createRandomDimensions()
    this.ctx = ctx
    this.ctxW = ctx.canvas.clientWidth
    this.ctxH = ctx.canvas.clientHeight

    this.x = getRandom(0, this.ctxW - this.dim.w)
    this.y = this.ctxH

    this.speed = Math.round(speedCoef/this.dim.w)
    this.id = Date.now()
  }

  getCenterCoords(){
    return {
      bx: this.x + this.dim.rx,
      by: this.y + this.dim.ry
    }
  }

  update(deltaTime, wind, destroyCallback){
    this.y -= this.speed * deltaTime
    this.x += wind
    if(this.x >= this.ctxW - this.dim.w){
      this.x = this.ctxW - this.dim.w
    }else if(this.x <= 0){
      this.x = 0
    }
    if(this.y + this.dim.h < 0) {
      this.destroy()
      destroyCallback(this.id)
    }
  }

  draw(){
    drawBalloon(this.ctx, this.getCenterCoords(), this.dim, this.color)
  }

  destroy(){
    this.svg.remove()
  }
}
