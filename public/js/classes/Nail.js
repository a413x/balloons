import {createNailSvg, nailDimensions} from '../createNailSvg.js'
import {Mouse} from './Mouse.js'
const marginTop = 10

export class Nail{
  constructor(ctx){
    this.svg = createNailSvg()
    this.x = ctx.width.baseVal.value/2 - nailDimensions.w/2
    this.y = marginTop + nailDimensions.h
    this.svg.setAttribute('x', this.x)
    this.svg.setAttribute('y', marginTop)
    ctx.append(this.svg)

    new Mouse(pos => this.mouseMove(pos), ctx)
  }
  mouseMove(pos){
    this.move(pos.x)
  }
  move(x){
    this.x = x
    this.svg.setAttribute('x', x - nailDimensions.w/2)
  }
  getNailPoint(){
    return {
      nx: this.x,
      ny: this.y,
    }
  }
}
