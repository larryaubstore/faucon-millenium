import { Tile }                       from '../models/tile';
import { TileType }                   from '../models/tileType';

import drawNormalType                 from './drawNormalType'; 
import drawMountainsExplosionType     from './drawMountainsExplosionType'; 
import drawFadeout                    from './drawFadeout'; 



export default function drawBoard(cb) {

  this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
  let tilePtr = null;
  let realNumber =  0;
  let indexGrid: string = null;
  let readIndexGrid: string = null;

  let cur: Tile = null; 
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < this.moduloRange; j++) {
      indexGrid = i + "-" + j;

      realNumber = ( ( (j + this.moduloTile ) % this.moduloRange) );
      readIndexGrid = i + '-' + realNumber;

      cur = this.gridMap[indexGrid];
      tilePtr = cur.imagePtr;

      cur.setOffsetY(this.offsetY);
      cur.setYPos(realNumber - 1);

      
      this.realPositionMap[readIndexGrid] = cur;

      switch(cur.tileType) {
        case TileType.Normal:
          drawNormalType.bind(this)(cur);
          break;
        case TileType.MountainExplosion:
          drawMountainsExplosionType.bind(this)(cur);
          break;
        case TileType.FauconExplosion:
          break;
      }
    }
  }

  cb(null);
}
