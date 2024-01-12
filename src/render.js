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
        this.selectedCoordinate = {q: null, r: null};
    }

    init()
    {
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(1, 0x999999);

        this.grid.forEach((tile) => tile.render(this.graphics));
        this.app.stage.addChild(this.graphics);

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
            if (e.event == "click") {
                tile.renderSelected(this.graphics);
                const selectedHex = this.getSelectedHex();

                if (selectedHex != null) {
                    selectedHex.render(this.graphics);
                }
                
                this.selectedCoordinate.q = e.q;
                this.selectedCoordinate.r = e.r;
            }
        }
    }

    addEvent(event){
        this.eventList.push(event);
    }

    getGrid(){
        return this.grid;
    }

    getSelectedHex(){
        if (this.selectedCoordinate.q == null && this.selectedCoordinate.r == null) {
            return null;
        } else {
            return this.grid.getHex({q: this.selectedCoordinate.q, r: this.selectedCoordinate.r});
        }
    }
}

export default Renderer