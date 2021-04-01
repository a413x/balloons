export class Mouse{
  constructor(callback, obj){
    this.callback = callback
    if(obj) {
      this.listen(obj)
    }
  }
  handleEnent(e){
    this.callback( { x: e.offsetX, y: e.offsetY} )
  }
  listen(obj){
    obj.onmousemove = e => this.handleEnent(e)
  }
  detach(obj){
    obj.onmousemove = null
  }
}
