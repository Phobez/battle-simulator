import * as PIXI from 'pixi.js';
import { Grid } from 'honeycomb-grid'
import { maxFPS } from '../game-config.json';

class Renderer
{
    /**
     * @type {Array}
     */
    eventList = [];

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
        /** @member {Array.<{q: Number, r:Number}>} */
        this.highlightedCoordinates = [];
    }

    init()
    {
        this.grid.forEach((tile) => this.app.stage.addChild(tile.render()));

        this.app.ticker.add((delta) => {
            const timeNow = (new Date()).getTime();
            const timeDiff = timeNow - this.elapsed;
            const tickLimit = 1000 / this.fps;
            if (timeDiff < tickLimit)
                return;

            this.elapsed = timeNow;
            this.processEvents();
        });
    }

    processEvents(){
        if (this.eventList.length === 0) return;

        while (this.eventList.length > 0) {
            const e = this.eventList.shift();
            const tile = this.grid.getHex({q: e.q, r: e.r});
            if (e.event == "highlight") {
                tile.renderSelected();
                this.highlightedCoordinates.push({q: tile.q, r: tile.r});
            } else if (e.event == "unhighlight") {
                tile.render();
                const highlightedIdx = this.highlightedCoordinates.findIndex(
                    (coordinate) => coordinate.q == tile.q && coordinate.r == tile.r
                );

                if (highlightedIdx !== -1) {
                    this.highlightedCoordinates.splice(highlightedIdx, 1);
                }
            }
        }
    }

    addEvent(event){
        this.eventList.push(event);
    }

    getGrid(){
        return this.grid;
    }

    getHighlightedTiles(){
        if (this.highlightedCoordinates.length === 0) return [];
        return this.highlightedCoordinates.map((coordinate) => {
            return this.grid.getHex(coordinate);
        });
    }
}

export default Renderer