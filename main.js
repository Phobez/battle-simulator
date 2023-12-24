import * as PIXI from 'pixi.js';
import { defineHex, Grid, rectangle } from 'honeycomb-grid'

// you may want the origin to be the top left corner of a hex's bounding box
// instead of its center (which is the default)
const Hex = defineHex({ dimensions: 30, origin: 'topLeft' })
const grid = new Grid(Hex, rectangle({ width: 10, height: 10 }))

const app = new PIXI.Application({ backgroundAlpha: 0 })
const graphics = new PIXI.Graphics()

document.body.appendChild(app.view)
graphics.lineStyle(1, 0x999999)

grid.forEach(renderHex)
app.stage.addChild(graphics)

function renderHex(hex) {
    // PIXI.Polygon happens to be compatible with hex.corners
    graphics.drawShape(
        new PIXI.Polygon(hex.corners)
    )
}