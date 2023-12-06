import { Vec } from "./math"

function mass(points) {
  let finalMass = 0
  points.forEach(({ mass }) => {
    finalMass += mass
  })
  return finalMass
}

export function centerOfMass(points) {
  let centerOfMass = new Vec(0, 0)
  points.forEach((point) => {
    const vecToAdd = new Vec(point.position)
    vecToAdd.mul(point.mass)
    centerOfMass.add(vecToAdd)
  })
  centerOfMass.div(mass(points))
  return centerOfMass
}

function momentOfInteria(points, centerOfMass) {
  let momentOfInertia = 0
  points.forEach((point) => {
    const pos = new Vec(point.position.x, point.position.y)

    pos.subtract(centerOfMass)
    momentOfInertia += point.mass * (Math.pow(pos.x, 2) + Math.pow(pos.y, 2))
  })
  return momentOfInertia
}

export function physikProps(points) {
  const properties = { totalMass: null, centerOfMass: null, momentOfInertia: null }
  properties.totalMass = mass(points)
  properties.centerOfMass = centerOfMass(points, properties.totalMass)
  properties.momentOfInertia = momentOfInteria(points, properties.centerOfMass)
  return properties
}

export function forceCollision(v1, v2, a1, a2, w1, w2, m1, m2, J1, J2) {
  const k = 0.5
  return (
    ((1 + k) * (v1 - v2 - a1 * w1 + a2 * w2)) /
    (1 / m1 + 1 / m2 + Math.pow(a1, 2) / J1 + Math.pow(a2, 2) / J2)
  )
}

export function velocityCollision(v, F, m) {
  return v - F / m
}

export function rotationCollision(w, a, F, J) {
  return w + (a * F) / J
}
