export class PlayButton{
  constructor(clickCallback){
    this.container = document.querySelector('.play-btn')
    this.levelText = document.querySelector('.play-btn .play-btn-level')
    this.btn = document.querySelector('.play-btn .play-btn-btn')
    this.levelResult = document.querySelector('.level-result')
    this.container.addEventListener('click', () => this.onClick(clickCallback))
  }
  showButton(level, score){
    this.levelText.textContent = 'level ' + level.levelNum
    if(score) { this.setResult(score) }
    else { this.setRestart() }
    this.setVisible(true)
  }
  onClick(clickCallback){
    this.setVisible(false)
    clickCallback()
  }
  setResult(score){
    this.btn.textContent = '►'
    this.levelResult.innerHTML =
    '<div>Your score is: </div>'+
    '<span class="score-destroyed">'+score.scoreDestroyed+' destroyed</span> '
    + '<span class="score-missed">'+score.scoreMissed+' missed</span>'
  }
  setVisible(visible){
    this.container.style.display = visible ? 'flex' : 'none'
  }
  setRestart(){
    this.btn.textContent = '⟳'
    this.levelResult.textContent = 'You lose. Too many balloons missed.'
  }
}
