import { Level } from "./Level.js"
import Timer from "./Timer.js"

const canvas = document.getElementById("screen")
const context = canvas.getContext("2d")

const mouseEvents = ["mousedown", "mousemove"]
mouseEvents.forEach((type) => {
  canvas.addEventListener(type, (event) => {
    level.drawNewElement(event)
  })
})

const level = new Level(canvas.width, canvas.height)
const timer = new Timer(1 / 60)

timer.update = function update(deltaTime) {
  level.update(deltaTime)
  level.draw(context)
}

timer.start()
