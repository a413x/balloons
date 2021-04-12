const roundTime = 60
export class Timer{
  constructor(){
    this.time = 0
    this.enable = true
    this.setTimer()
  }
  get timeSec(){
    return Math.floor(this.time)
  }
  update(deltaTime, endLevel){
    if(this.timeSec < roundTime && this.enable){
      this.time += deltaTime
      this.setTimer()
    }else{
      this.time = 0
      this.enable = false
      endLevel()
    }
  }
  setTimer(){
    document.querySelector('.timer').textContent = roundTime - this.timeSec
  }
}
