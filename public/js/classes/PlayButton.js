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
  setVisible(visible){
    this.container.style.display = visible ? 'flex' : 'none'
  }
}
