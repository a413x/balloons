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
