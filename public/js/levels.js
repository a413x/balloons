let levelInd = 0
const levels = [
  {ind: 1, speedCoef: 5000, nextBalloonTime: 3},
  {ind: 2, speedCoef: 7000, nextBalloonTime: 2},
  {ind: 3, speedCoef: 9000, nextBalloonTime: 1},
  {ind: 4, speedCoef: 12000, nextBalloonTime: .5},
  {ind: 5, speedCoef: 15000, nextBalloonTime: .3},
]
export function nextLevel(){
  const maxInd = Object.keys(levels).length-1
  if(levelInd > maxInd){
    return levels[maxInd]
  }
  const level = levels[levelInd]
  levelInd++
  return level
}
