import {getRandomColor, createRandomDimensions} from './utils.js'

export function createBalloonSvg(){
  const color = getRandomColor()
  const stroke = 4
  const {w, h, rx, ry} = createRandomDimensions()

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

  rope.setAttribute('d',
    'M'+w/2+','+(ry*2-2)+
    'c-'+.12*h+','+.24*h+','+.18*h+','+.06*h+',0,'+(h-ry*2)
  )

  svg.append(rope, ellipse, strokeEllipse)
  return {svg, w, h, rx, ry}
}
