import { Tile }       from '../models/tile';
import { TileType }   from '../models/tileType';

export default function buildGrid(cb: any) {

  this.entities = [];
  /*************/
  let index = 0;
  let tile: Tile = null;
  let indexRandom = null;
  let collisionType = null;

  let piratePerLine = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < this.moduloRange; j++) {
      index = i;
      piratePerLine = 0; 
      
      indexRandom = Math.floor(Math.random() * this.aliasMap['tile'].length + this.aliasMap['tile'].begin);
      collisionType = this.collisionList[indexRandom - this.aliasMap['tile'].begin];

      if (collisionType === 'collisionPirate') {
        indexRandom = Math.floor(0 * this.aliasMap['tile'].length + this.aliasMap['tile'].begin);
      }
      tile = new Tile(this.imageList[indexRandom], 
                      i, 
                      j, 
                      this.tileWidth, 
                      this.tileHeight, 
                      // collisionList = [ 'nocollision', 'collision', 'nocollision' ] 
                      this.collisionList[indexRandom - this.aliasMap['tile'].begin],
                      this.liveMap, 
                      TileType.Normal); 

      this.gridMap[i + "-" + j] = tile; 
    }
  }
  
  cb(null);
}
