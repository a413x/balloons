export function collisionDetect(nail, balloons){
  const {nx, ny} = nail
  const collisions = []

  balloons.forEach((b, id) => {
    const {bx, by} = b.getCenterCoords()
    const rx = b.rx
    const ry = b.ry

    const angle = Math.atan2(ny - by, nx - bx)

    const radius = rx*ry/(
      Math.sqrt(
        Math.pow(rx*Math.cos(angle),2) + Math.pow(ry*Math.sin(angle),2)
      )
    )

    const distance = Math.sqrt(Math.pow(nx - bx,2) + Math.pow(ny - by,2))

    if(radius > distance) collisions.push(id)
  })

  return collisions
}
