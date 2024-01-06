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
     * @param {import('honeycomb-grid').HexCoordinates} coordinates 
     * @param {Number} cellNumber 
     */
    static create(coordinates, cellNumber)
    {
        const hex = new MapTile(coordinates);
        hex.cellNumber = cellNumber;
        return hex;
    }

    /**
     * @param {PIXI.Graphics} graphic 
     */
    render(graphic)
    {
        let cellColor = gridColor.background;
        if (this.cellNumber > 0) {
            cellColor = gridColor.primary;
        }

        graphic.beginFill(cellColor).drawShape(new PIXI.Polygon(this.corners));

        if (this.cellNumber > 0) {
            const text = new PIXI.Text(this.cellNumber);
            text.x = this.x - text.width / 2;
            text.y = this.y - text.height / 2;
            graphic.addChild(text);
        }

        graphic.endFill();
    }

    /**
     * @param {PIXI.Graphics} graphic 
     */
    renderSelected(graphic)
    {
        graphic.beginFill(gridColor.highlight)
            .drawShape(new PIXI.Polygon(this.corners))
            .endFill();
    }
}

export default MapTile;