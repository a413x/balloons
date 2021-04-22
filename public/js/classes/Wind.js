import {getRandom} from '../utils.js'
const coef = 5000
let prevTimeSec = 0

export class Wind{
  constructor(ctx){
    this.ctxW = ctx.canvas.clientWidth
    this.power = 0
    this.direction = 0
    this.windTime = 0
  }
  addWind(){
    this.direction = Math.random() < 0.5 ? -1 : 1
    this.power = getRandom(1,5)
    this.windDuration = getRandom(5,10)
    this.setWind()
  }
  cancelWind(){
    this.power = 0
    this.setWind()
  }
  calculateWindAffect(balloon){
    const bleft = balloon.x
    const bright = balloon.x + balloon.w
    const boundDistance = this.direction > 0 ? bleft : this.ctxW - bright
    const coef = 1 - boundDistance/this.ctxW
    const windAffect = this.power*this.direction*coef
    return windAffect
  }
  windInterval(timeSec){
    if(prevTimeSec === timeSec) return
    if(this.power === 0){
      if(Math.random() < 0.1) {
        this.windTime = 0
        this.addWind()
      }
    }else{
      this.windTime ++
      if(this.windTime > this.windDuration){
        this.cancelWind()
      }
    }
    prevTimeSec = timeSec
  }
  setWind(){
    let dir = this.direction > 0 ? 'WEST' : 'EAST'
    if(this.power === 0) dir = 'NONE'
    document.querySelector('.wind-info .wind-dir').textContent = dir
    document.querySelector('.wind-info .wind-pow').textContent = this.power
  }
}
