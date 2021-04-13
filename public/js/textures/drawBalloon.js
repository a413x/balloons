import {getRandomColor, createRandomDimensions} from '../utils.js'

export function drawBalloon(ctx, coords, dimensions, color){
  const {w, h, rx, ry} = dimensions
  const stroke = 4
  const {bx, by} = coords

  ctx.fillStyle = color
  ctx.strokeStyle = 'black'
  ctx.lineWidth = stroke
  ctx.beginPath()
  ctx.ellipse(bx, by, rx, ry, 2*Math.PI, 0, 2*Math.PI)
  ctx.fill()
  ctx.stroke();
  const rope = new Path2D(
    'M'+bx+','+(by+ry)+
    'c-'+.12*h+','+.24*h+','+.18*h+','+.06*h+',0,'+(h-ry*2)
  )
  ctx.stroke(rope)
}
