export function onResize(){
  const gameW = 700
  const gameH = 850
  const w = document.documentElement.clientWidth
  const h = document.documentElement.clientHeight
  if(h < gameH || w < gameW){
   document.body.style.zoom = h/gameH < w/gameW ? h/gameH : w/gameW
  }
  else document.body.style.zoom = 1
}
