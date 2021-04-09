import {levels} from '../levels.js'
export class Level{
  constructor(){
    this.index = 0
    this.params = levels[0]
    this.setLevel()
  }
  get levelNum(){
    return this.index + 1
  }
  nextLevel(){
    const maxInd = Object.keys(levels).length-1
    if(this.index >= maxInd) return
    this.index++
    this.params = levels[this.index]
    this.setLevel()
  }
  setLevel(){
    document.querySelector('.level .value').textContent = this.levelNum
  }
}
