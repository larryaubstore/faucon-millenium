import { Tile }           from '../models/tile';

export default function drawNormalType(cur: Tile) {

  let tilePtr = cur.imagePtr;
  this.drawImage(tilePtr, 
                         cur.xPos * this.tileWidth, 
                         cur.getCalcYPos(), 
                         this.tileWidth, 
                         this.tileHeight);


}
