export function getRandomColor(){
  const r = getRandom(0, 255)
  const g = getRandom(0, 255)
  const b = getRandom(0, 255)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

export function getRandom(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export function createRandomDimensions(){
  const w = getRandom(40,100)
  const h = w*2
  const rx = w/2
  const ry = 1.175*rx
  return {w, h, rx, ry}
}
