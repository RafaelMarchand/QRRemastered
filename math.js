export class Vec {
  constructor(x, y) {
    if (x instanceof Vec) {
      this.set(x.x, x.y)
    } else {
      this.set(x, y)
    }
  }

  set(x, y) {
    this.x = x
    this.y = y
  }

  isEqual(vec) {
    if (this.x === vec.x && this.y === vec.y) {
      return true
    }
    return false
  }

  isSimilar(vec, delta) {
    let xSimilarity = Math.abs(this.x - vec.x) <= delta
    let ySimilarity = Math.abs(this.y - vec.y) <= delta
    return xSimilarity && ySimilarity
  }

  add(value) {
    if (value instanceof Vec) {
      this.x += value.x
      this.y += value.y
    } else {
      this.x += value
      this.y += value
    }
  }

  subtract(value) {
    if (value instanceof Vec) {
      this.x -= value.x
      this.y -= value.y
    } else {
      this.add(-value)
    }
  }

  div(divider) {
    if (divider instanceof Vec) {
      this.x = this.x / factor.x
      this.y = this.y / factor.y
    } else {
      this.x = this.x / divider
      this.y = this.y / divider
    }
  }

  mul(factor) {
    if (factor instanceof Vec) {
      this.x = this.x * factor.x
      this.y = this.y * factor.y
    } else {
      this.x = this.x * factor
      this.y = this.y * factor
    }
  }
}
