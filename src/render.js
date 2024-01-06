import * as PIXI from 'pixi.js';
import { Grid } from 'honeycomb-grid'
import { maxFPS } from '../game-config.json';

class Renderer
{
    /**
     * Construct the renderer object
     * @param {PIXI.Application} app 
     * @param {Grid} grid 
     */
    constructor(app, grid)
    {
        this.app = app;
        this.grid = grid;
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

        const renderTile = (tile) => {
            if (this.selectedCoordinate.q == tile.q && this.selectedCoordinate.r == tile.r) {
                tile.renderSelected(graphics);
            } else {
                tile.render(graphics);
            }
        }

        this.app.ticker.add((delta) => {
            const timeNow = (new Date()).getTime();
            const timeDiff = timeNow - this.elapsed;
            const tickLimit = 1000 / this.fps;
            if (timeDiff < tickLimit)
                return;

            this.elapsed = timeNow;
            this.grid.forEach(renderTile);
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