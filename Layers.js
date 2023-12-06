export function createBackgroundLayer(width, height) {
  const buffer = document.createElement("canvas")
  buffer.width = width
  buffer.height = height

  const contextBuffer = buffer.getContext("2d")
  contextBuffer.fillStyle = "#000"
  contextBuffer.fillRect(0, 0, width, height)
  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0)
  }
}

export function createDrawingLayer(level, width, height) {
  const drawingBuffer = document.createElement("canvas")
  drawingBuffer.width = width
  drawingBuffer.height = height
  const drawingBufferContext = drawingBuffer.getContext("2d")

  return function drawDrawingLayer(context) {
    if (!level.currentElement) {
      return
    }
    drawingBufferContext.clearRect(0, 0, width, height)
    level.currentElement.draw(level.currentElement.points, drawingBufferContext)
    context.drawImage(drawingBuffer, 0, 0)
  }
}

export function createElementsLayer(elements, width, height) {
  const elementsBuffer = document.createElement("canvas")
  elementsBuffer.width = width
  elementsBuffer.height = height
  const elementsBufferContext = elementsBuffer.getContext("2d")

  return function drawElementsLayer(context) {
    elementsBufferContext.clearRect(0, 0, width, height)
    elements.forEach((element) => {
      element.draw(element.points, elementsBufferContext)
    })
    context.drawImage(elementsBuffer, 0, 0)
  }
}
