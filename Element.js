import { Vec } from "./math"
import { physikProps, centerOfMass } from "./Physik.js"

const RADIUS = 10

export class Element {
  constructor(points, position, lineSegments) {
    this.position = position
    this.points = points
    this.lineSegments = lineSegments
    this.width = 0
    this.height = 0
    this.rotation = 0
    this.velocity = new Vec(0, 0)
    this.deltaDistance = new Vec(0, 0)
  }

  boundaries() {
    let minX = 0
    let maxX = 0
    let minY = 0
    let maxY = 0
    this.points.forEach(({ position }, index) => {
      if (index === 0) {
        minX = position.x
        maxX = position.x
        minY = position.y
        maxY = position.y
      }
      if (position.x > maxX) {
        maxX = position.x
      }
      if (position.y > maxY) {
        maxY = position.y
      }
      if (position.x < minX) {
        minX = position.x
      }
      if (position.y < minY) {
        minY = position.y
      }
    })
    return [minX, maxX, minY, maxY]
  }

  setSize() {
    const [minX, maxX, minY, maxY] = this.boundaries()
    this.width = maxX - minX + RADIUS * 2
    this.height = maxY - minY + RADIUS * 2
  }

  rotate(angle) {
    this.points.forEach((point) => {
      const xRotated = point.position.x * Math.cos(angle) - point.position.y * Math.sin(angle)
      const yRotated = point.position.x * Math.sin(angle) + point.position.y * Math.cos(angle)

      point.position.set(xRotated, yRotated)
    })
  }

  update(deltaTime) {
    const GRAVITY = 400
    this.velocity.y += GRAVITY * deltaTime
    this.deltaDistance = this.velocity.y * deltaTime
    this.position.y += this.deltaDistance
    this.wallCollision()
    //this.rotate(0.01)
  }

  wallCollision(height = 800, width = 1000) {
    const K = -0.44
    if (this.position.x + this.width > width) {
      const distanceToWall = this.position.x - width
      this.position.x -= distanceToWall
    }
    if (this.position.x < 0) {
      this.position.x = 0
    }
    if (this.position.y + this.height > height) {
      this.position.y -= this.deltaDistance
      this.velocity.y *= K
    }
    if (this.position.y < 0) {
      this.position.y = 0
    }
  }

  draw(points, context) {
    context.fillStyle = "blue"

    context.strokeRect(0, 0, this.width, this.height)

    points.forEach((point) => {
      context.beginPath()
      context.arc(
        point.position.x + this.position.x,
        point.position.y + this.position.y,
        RADIUS,
        0,
        2 * Math.PI
      )
      context.fill()
    })

    context.fillStyle = "yellow"
    context.beginPath()
    context.arc(this.position.x, this.position.y, RADIUS, 0, 2 * Math.PI)
    context.fill()

    function midPoint(p1, p2) {
      const x = Math.round((p1.x + p2.x) / 2)
      const y = Math.round((p1.y + p2.y) / 2)
      return new Vec(x, y)
    }

    function distance(p1, p2) {
      const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
      return Math.round(distance)
    }

    function controlPoint(p1, p2, sPrev, sAct) {
      const midPoint = midPoint(p1, p2)

      const slopePerp = -1 / sAct
      const w = distance(p1, midPoint)

      const x = (sPrev * w) / Math.sqrt(1 + Math.pow(slopePerp, 2))
      const y = x * slopePerp
      return new Vec(x, y)
    }
  }
}
