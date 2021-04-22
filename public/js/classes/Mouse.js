export class Mouse{
  constructor(callback, obj){
    this.callback = callback
    if(obj) {
      this.listen(obj)
    }
  }
  handleEnent(e){
    const event = e.targetTouches ? e.targetTouches[0] : e
    const zoom = getComputedStyle(document.body).getPropertyValue('zoom')
    let obj = e.target
    let objLeft = 0
    let objTop = 0
    let x = event.pageX/zoom
    let y = event.pageY/zoom
    while (obj.offsetParent)
    {
      objLeft += obj.offsetLeft
      objTop += obj.offsetTop
      obj = obj.offsetParent
    }
    x -= objLeft
    y -= objTop
    this.callback({x, y})
  }
  listen(obj){
    const handle = e => this.handleEnent(e)
    obj.onmousemove = handle
    obj.ontouchmove = handle
  }
  detach(obj){
    obj.onmousemove = null
    obj.ontouchmove = null
  }
}
