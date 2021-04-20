export class PauseButton{
  constructor(callback){
    this.btn = document.querySelector('.pause-btn-btn')
    this.msg = document.querySelector('.pause-btn-msg')
    this.btn.addEventListener('click', () => callback())
  }
  setPause(paused){
    this.btn.textContent = paused ? '►' : '❚❚'
    this.msg.style.display = paused ? 'block' : 'none'
  }
}
