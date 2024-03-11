class GameSystem
{
    /**
     * @type {import('./model/MapTile').default}
     */
    activeTile = null;

    /**
     * 
     * @param {import('./render').default} renderer 
     */
    constructor(renderer)
    {
        this.renderer = renderer;
    }

    selectTile(tile) {
        if (tile === undefined) {
            this.renderer.addEvent({q: this.activeTile.q, r: this.activeTile.r, event: 'unhighlight'});
            this.activeTile = null;
        } else {
            this.activeTile = tile;
            this.renderer.addEvent({q: this.activeTile.q, r: this.activeTile.r, event: 'highlight'});
        }
    }

    attemptTileMovement(targetTile) {
        if (targetTile === undefined) {
            this.selectTile(undefined);
            return;
        }

        const grid = this.renderer.getGrid();
        const distance = grid.distance(this.activeTile, targetTile);
        if (distance != 1) {
            this.selectTile(undefined);
            return;
        }

        this.moveTile(targetTile);
    }

    moveTile(targetTile) {
        targetTile.cellNumber += this.activeTile.cellNumber;
        this.activeTile.cellNumber = 0;
        this.selectTile(undefined);
        targetTile.render();
    }
}

export default GameSystem;