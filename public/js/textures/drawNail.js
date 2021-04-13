export const nailDimensions = {
  w: 8, h: 30,
}

export function drawNail(ctx, coords){
  const {w, h} = nailDimensions
  const {nx, ny} = coords
  ctx.fillStyle = 'black'
  ctx.beginPath()
  ctx.arc(nx, ny-h+w/2, w/2, 0, Math.PI*2)
  ctx.fill()
  ctx.moveTo(nx-w/2, ny-h+w/2)
  ctx.lineTo(nx,ny)
  ctx.lineTo(nx+w/2,ny-h+w/2)
  ctx.fill()
}
