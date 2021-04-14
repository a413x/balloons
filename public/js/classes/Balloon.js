import {drawBalloon} from '../textures/drawBalloon.js'
import {getRandom, createRandomDimensions, getRandomColor} from '../utils.js'

export class Balloon{
  constructor(ctx, speedCoef){
    this.color = getRandomColor()
    this.dim = createRandomDimensions()
    this.w = this.dim.w
    this.h = this.dim.h
    this.rx = this.dim.rx
    this.ry = this.dim.ry
    this.ctx = ctx
    this.ctxW = ctx.canvas.clientWidth
    this.ctxH = ctx.canvas.clientHeight

    this.x = getRandom(0, this.ctxW - this.w)
    this.y = this.ctxH

    this.speed = Math.round(speedCoef/this.w)
    this.id = Date.now()
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
    if(this.y + this.h < 0) {
      destroyCallback(this.id)
    }
  }

  draw(){
    drawBalloon(this.ctx, this.getCenterCoords(), this.dim, this.color)
  }
}
