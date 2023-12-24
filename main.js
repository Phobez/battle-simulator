import * as PIXI from 'pixi.js';
import Renderer from './src/render'

const app = new PIXI.Application({ backgroundAlpha: 0 })

document.body.appendChild(app.view)

const renderer = new Renderer(
    app,
    { dimensions: 30, origin: 'topLeft' },
    { width: 10, height: 10 }
);
renderer.init();

const grid = renderer.getGrid();

document.addEventListener('click', ({offsetX, offsetY}) => {
    const hex = grid.pointToHex(
        { x: offsetX, y: offsetY },
        { allowOutside: false }
    );
    
    if (hex !== undefined) {
        renderer.selectCoordinate(hex.q, hex.r);
    } else {
        renderer.selectCoordinate(null, null);
    }
});