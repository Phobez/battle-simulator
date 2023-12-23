import * as PIXI from 'pixi.js';
import { defineHex, Grid, rectangle } from 'honeycomb-grid'

const Hex = defineHex({ dimensions: 30, origin: 'topLeft' })
const grid = new Grid(Hex, rectangle({ width: 10, height: 10 }))

const app = new PIXI.Application({ backgroundAlpha: 0 })
const graphics = new PIXI.Graphics()

document.body.appendChild(app.view)
graphics.lineStyle(1, 0x999999)

grid.forEach(renderHex)
app.stage.addChild(graphics)

function renderHex(hex) {
    graphics
        .beginFill('#000')
        .drawShape(new PIXI.Polygon(hex.corners))
        .endFill();
}

document.addEventListener('click', ({offsetX, offsetY}) => {
    const hex = grid.pointToHex(
        { x: offsetX, y: offsetY }
    );
    
});