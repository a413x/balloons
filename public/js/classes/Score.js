export class Score{
  constructor(missedCallback){
    this.scoreDestroyed = 0
    this.scoreMissed = 0
    this.missedCallback = missedCallback
  }
  update(type = null){
    if(type === true) this.scoreDestroyed++
    else if(type === false) {
      this.scoreMissed++
      this.missedCallback()
    }
    else if(type === null) {
      this.scoreDestroyed = 0
      this.scoreMissed = 0
    }
    document.querySelector('.score-destroyed .value').textContent = this.scoreDestroyed
    document.querySelector('.score-missed .value').textContent = this.scoreMissed
  }
  reset(){
    this.update(null)
  }
}
