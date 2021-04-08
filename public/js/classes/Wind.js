import {getRandom} from '../utils.js'
const coef = 5000

export class Wind{
  constructor(ctx){
    this.ctxW = ctx.width.baseVal.value
  }
  addWind(){
    this.direction = Math.random() < 0.5 ? -1 : 1
    this.power = getRandom(1,5)
  }
  cancelWind(){
    this.power = 0
  }
  calculateWindAffect(balloon){
    const bleft = balloon.x
    const bright = balloon.x + balloon.w
    const boundDistance = this.direction > 0 ? bleft : this.ctxW - bright
    const coef = 1 - boundDistance/this.ctxW
    const windAffect = this.power*this.direction*coef
    return windAffect
  }
}
