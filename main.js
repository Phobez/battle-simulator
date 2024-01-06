import * as PIXI from 'pixi.js';
import { Grid } from 'honeycomb-grid';
import Renderer from './src/render';
import MapTile from './src/model/MapTile';

const app = new PIXI.Application({ backgroundAlpha: 0 });

globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.view);

// TEMP CREATE GRID

let exampleGrid = [];

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const randNum = Math.floor(Math.random() * 3);
        const coordinates = { col: j, row: i };
        exampleGrid.push(MapTile.create(coordinates, (randNum < 1 ? 1 : 0)));
    }
}

// END TEMP CREATE GRID

const renderer = new Renderer(
    app,
    Grid.fromIterable(exampleGrid)
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