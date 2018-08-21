import { Tile }     from '../models/tile';

export default function buildGrid(cb: any) {

   this.entities = [];
   /*************/
   let index = 0;
   let tile: Tile = null;
   let indexRandom = null;
   
   for (let i = 0; i < 5; i++) {
     for (let j = 0; j < this.moduloRange; j++) {
       index = i;
       indexRandom = Math.floor(Math.random() * this.aliasMap['tile'].length);
       tile = new Tile(this.imageList[indexRandom], 
                       i, 
                       j, 
                       this.tileWidth, 
                       this.tileHeight, 
                       this.collisionList[indexRandom],
                       this.liveMap); 

       this.gridMap[i + "-" + j] = tile; 
     }
   }

   cb(null);
}
