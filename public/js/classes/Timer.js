const roundTime = 60
export class Timer{
  constructor(){
    this.time = 0
    this.setTimer()
  }
  get timeSec(){
    return Math.floor(this.time)
  }
  update(deltaTime, endLevel){
    if(this.timeSec < roundTime){
      this.time += deltaTime
      this.setTimer()
    }else{
      this.reset()
      endLevel()
    }
  }
  reset(){ this.time = 0 }
  setTimer(){
    document.querySelector('.timer').textContent = roundTime - this.timeSec
  }
}
