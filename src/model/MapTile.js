import { defineHex } from 'honeycomb-grid'
import gameConfig from '../../game-config.json'
import { grid as gridColor } from '../../colors.json'
import * as PIXI from 'pixi.js';

class MapTile extends defineHex(gameConfig.hex)
{
    /**
     * @type {Number}
     */
    cellNumber;

    /**
     * @type {PIXI.Graphics}
     */
    graphic;

    /**
     * @param {import('honeycomb-grid').HexCoordinates} coordinates 
     * @param {Number} cellNumber 
     */
    static create(coordinates, cellNumber)
    {
        const hex = new MapTile(coordinates);
        hex.cellNumber = cellNumber;
        hex.graphic = new PIXI.Graphics();
        // hex.graphic.lineStyle(1, 0x999999);
        return hex;
    }

    /**
     * @param {PIXI.Graphics} graphic 
     */
    render()
    {
        this.graphic.clear();
        this.graphic.lineStyle(1, 0x999999);
        // graphic.clear();
        let cellColor = gridColor.background;
        if (this.cellNumber > 0) {
            cellColor = gridColor.primary;
        }

        this.graphic.beginFill(cellColor).drawShape(new PIXI.Polygon(this.corners));

        this.graphic.removeChildren();
        if (this.cellNumber > 0) {
            const text = new PIXI.Text(this.cellNumber);
            text.x = this.x - text.width / 2;
            text.y = this.y - text.height / 2;
            this.graphic.addChild(text);
        }

        this.graphic.endFill();

        return this.graphic;
    }

    /**
     * @param {PIXI.Graphics} graphic 
     */
    renderSelected()
    {
        this.graphic.clear();
        this.graphic.lineStyle(1, 0x999999);
        // graphic.clear();
        this.graphic.beginFill(gridColor.highlight)
            .drawShape(new PIXI.Polygon(this.corners))
            .endFill();
    }
}

export default MapTile;