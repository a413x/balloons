import {getRandomColor} from './utils.js'

export const dimensions = {
  w: 80, h: 170, rx: 40, ry: 47, stroke: 4,
}

export function createBalloonSvg(){
  const color = getRandomColor()
  const {w, h, rx, ry, stroke} = dimensions

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
  const strokeEllipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
  const rope = document.createElementNS('http://www.w3.org/2000/svg', 'path')

  svg.setAttribute('width', w)
  svg.setAttribute('height', h)
  svg.setAttribute('fill', 'transparent')
  svg.setAttribute('stroke', 'black')
  svg.setAttribute('stroke-width', stroke)

  ellipse.setAttribute('cx', w/2)
  ellipse.setAttribute('cy', ry)
  ellipse.setAttribute('rx', rx)
  ellipse.setAttribute('ry', ry)
  ellipse.setAttribute('stroke', 'none')
  ellipse.setAttribute('fill', color)

  strokeEllipse.setAttribute('cx', w/2)
  strokeEllipse.setAttribute('cy', ry)
  strokeEllipse.setAttribute('rx', rx - stroke/2)
  strokeEllipse.setAttribute('ry', ry - stroke/2)

  rope.setAttribute('d', 'M'+w/2+','+(ry*2-2)+'c-20,40,30,10,0,'+(h-ry*2))

  svg.append(rope, ellipse, strokeEllipse)
  return svg
}
