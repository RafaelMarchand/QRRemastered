import Compositor from "./Compositor.js"
import { createBackgroundLayer, createElementsLayer, createDrawingLayer } from "./Layers.js"
import { Vec } from "./math.js"
import { ElementBuilder } from "./ElementBuilder.js"
import Collider from "./Collider.js"

export class Level {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.elements = []
    this.elementBuilder = new ElementBuilder()
    this.currentElement = null
    this.compositor = new Compositor()
    this.collider = new Collider(this.elements)

    this.compositor.addLayer(createBackgroundLayer(this.width, this.height))
    this.compositor.addLayer(createElementsLayer(this.elements, this.width, this.height))
    this.compositor.addLayer(createDrawingLayer(this, this.width, this.height))
  }

  drawNewElement({ buttons, type, offsetX, offsetY }) {
    const LEFT_MOUSE_DOWN = 1
    const MOUSE_UP = 0

    if (buttons === LEFT_MOUSE_DOWN || type === "mousedown") {
      this.currentElement = this.elementBuilder.build(offsetX, offsetY, false)
    }
    if (buttons === MOUSE_UP && this.currentElement) {
      this.elements.push(this.elementBuilder.build(offsetX, offsetY, true))
      this.currentElement = null
      console.log(this.elements)
    }
  }

  update(deltaTime) {
    this.elements.forEach((element) => {
      element.update(deltaTime)
    })
  }

  draw(context) {
    this.compositor.draw(context)
  }
}
