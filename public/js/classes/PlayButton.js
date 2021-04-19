export class PlayButton{
  constructor(clickCallback){
    this.container = document.querySelector('.play-btn')
    this.levelText = document.querySelector('.play-btn .play-btn-level')
    this.container.addEventListener('click', () => this.onClick(clickCallback))
  }
  showButton(level){
    this.levelText.textContent = 'level ' + level
    this.setVisible(true)
  }
  onClick(clickCallback){
    this.setVisible(false)
    clickCallback()
  }
  setResult(score){
    document.querySelector('.level-result').innerHTML =
    '<div>Your score is: </div>'+
    '<span class="score-destroyed">'+score.scoreDestroyed+' destroyed</span> '
    + '<span class="score-missed">'+score.scoreMissed+' missed</span>'
  }
  setVisible(visible){
    this.container.style.display = visible ? 'flex' : 'none'
  }
}
