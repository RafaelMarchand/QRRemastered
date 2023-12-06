import { Vec } from "./math.js"
import { centerOfMass } from "./Physik.js"
import { Element } from "./Element.js"

export class ElementBuilder {
  constructor() {
    this.points = []
  }

  build(offsetX, offsetY, finalize) {
    this.addPoint(offsetX, offsetY)

    const position = centerOfMass(this.points)
    const relativePoints = this.points.map((point) => {
      const relativePosition = new Vec(point.position)
      relativePosition.subtract(position)
      return { position: relativePosition, mass: point.mass }
    })

    const lineSegments = this.lineSegments(relativePoints)
    const element = new Element(relativePoints, position, lineSegments)

    if (finalize) {
      this.points.length = 0
    } else {
      element.update = () => {}
    }
    return element
  }

  addPoint(offsetX, offsetY) {
    const MIN_DELTA_POSITION = 1
    const position = new Vec(offsetX, offsetY)
    const identicalPosition = this.points.find((point) =>
      point.position.isSimilar(position, MIN_DELTA_POSITION)
    )
    if (identicalPosition) {
      identicalPosition.mass += 1
      return
    }
    this.points.push({ position: position, mass: 1 })
  }

  lineSegments(points) {
    let previousSlope
    let lineSegments = []
    for (let i = 0; i < points.length - 1; i++) {
      const slopeX = points[i].position.x - points[i + 1].position.x
      const slopeY = points[i].position.y - points[i + 1].position.y
      const slope = slopeY / slopeX

      if (!previousSlope) {
        previousSlope = slope
      }

      lineSegments.push({
        p1: points[i],
        p2: points[i + 1],
        sAct: slope,
        sPrev: previousSlope
      })
      previousSlope = slope
    }
    return lineSegments
  }
}
