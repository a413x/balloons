export const dimensions = {
  w: 8, h: 30,
}

export function createNailSvg(){
  const {w, h} = dimensions

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
  const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')

  svg.setAttribute('width', w)
  svg.setAttribute('height', h)
  svg.setAttribute('fill', 'transparent')

  ellipse.setAttribute('cx', w/2)
  ellipse.setAttribute('cy', w/2)
  ellipse.setAttribute('rx', w/2)
  ellipse.setAttribute('ry', w/2)
  ellipse.setAttribute('fill', 'black')

  triangle.setAttribute('points', [
    0,w/2,
    w,w/2,
    w/2,h,
    0,w/2
  ].join(','))
  triangle.setAttribute('fill', 'black')

  svg.append(ellipse, triangle)
  return svg
}
