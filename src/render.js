import * as PIXI from 'pixi.js';
import { defineHex, Grid, rectangle } from 'honeycomb-grid'
import { grid as gridColor } from '../colors.json'
import { maxFPS } from '../game-config.json';

class Renderer
{
    /**
     * Construct the renderer object
     * @param {PIXI.Application} app 
     * @param {object} hexConfig 
     * @param {object} gridConfig 
     */
    constructor(app, hexConfig, gridConfig)
    {
        this.app = app;
        this.hex = defineHex(hexConfig);
        this.grid = new Grid(this.hex, rectangle(gridConfig));
        /** @member {Number} */
        this.elapsed = 0.0;
        /** @member {Number} */
        this.fps = maxFPS;
        this.selectedCoordinate = {q: null, r: null};
    }

    init()
    {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x999999);

        const renderHex = (hex) => {
            let cellColor = gridColor.background;
            if (this.selectedCoordinate.q == hex.q && this.selectedCoordinate.r == hex.r) {
                cellColor = gridColor.highlight;
            }
        
            graphics
                .beginFill(cellColor)
                .drawShape(new PIXI.Polygon(hex.corners))
                .endFill();
        }

        this.app.ticker.add((delta) => {
            const timeNow = (new Date()).getTime();
            const timeDiff = timeNow - this.elapsed;
            const tickLimit = 1000 / this.fps;
            if (timeDiff < tickLimit)
                return;

            this.elapsed = timeNow;
            this.grid.forEach(renderHex);
            this.app.stage.addChild(graphics);
        });
    }

    selectCoordinate(q, r){
        this.selectedCoordinate.q = q;
        this.selectedCoordinate.r = r;
    }

    getGrid(){
        return this.grid;
    }
}

export default Renderer