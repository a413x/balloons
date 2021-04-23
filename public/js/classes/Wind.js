import {getRandom} from '../utils.js'
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
    this.power = this.getRandomPower()
    this.windDuration = getRandom(1,8)
    this.setWind()
  }
  getRandomPower(){
    return Math.round((Math.random()*2 + 1)*10)/10
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
      //chance of appearance every second
      if(Math.random() < 0.2) {
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
