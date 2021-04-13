import {drawNail, nailDimensions} from '../textures/drawNail.js'
import {Mouse} from './Mouse.js'
const marginTop = 10

export class Nail{
  constructor(ctx){
    this.ctx = ctx
    this.x = ctx.canvas.clientWidth/2 - nailDimensions.w/2
    this.y = marginTop + nailDimensions.h
    new Mouse(pos => this.mouseMove(pos), ctx.canvas)
  }
  mouseMove(pos){
    this.x = pos.x
  }
  getNailPoint(){
    return {
      nx: this.x,
      ny: this.y,
    }
  }
  draw(){
    drawNail(this.ctx, this.getNailPoint())
  }
}
