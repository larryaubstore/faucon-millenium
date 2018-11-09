import { TileType }                   from '../models/tileType';
import { Tile }                       from '../models/tile';

export default function oneMoreLine(cb) {


  if (this.isExplosion === -1) {
    let cur: Tile = null;
    let indexRandom: any = null;
    let collisionType = null;

    if (this.moduloTile !== this.currentModuloTile) {

      this.currentModuloTile = this.moduloTile;
      let realIndexGrid: string = null;
      let piratePerLine = 0;
      for (var i = 0; i < 5; i++) {
        indexRandom = Math.floor(Math.random() * this.aliasMap['tile'].length + this.aliasMap['tile'].begin);
        collisionType = this.collisionList[indexRandom - this.aliasMap['tile'].begin];

        if (this.isInitialMode() && collisionType === 'collisionPirate') {
          indexRandom = Math.floor(0 * this.aliasMap['tile'].length + this.aliasMap['tile'].begin);
        } else if (piratePerLine === 1 && collisionType === 'collisionPirate') {
          // Pas plus d'un pirate par ligne
          indexRandom = Math.floor(0 * this.aliasMap['tile'].length + this.aliasMap['tile'].begin);
        } else if (collisionType === 'collisionPirate') { 
          piratePerLine = 1;
        }




        /* Le 'verticalIndex' vient de changer c'est pourquoi 
         * on fait le changement sur le total du nombre
         * d'items en hauteur et non pas sur la position 0 */
        realIndexGrid = i + '-' + (this.moduloRange - 1);
        cur = this.realPositionMap[realIndexGrid];
        cur.tileType = TileType.Normal;


        cur.imagePtr = this.imageList[indexRandom];
        cur.collision = this.collisionList[indexRandom - this.aliasMap['tile'].begin];
        cur.indexAnimation = -1;
      }
    }
  }
  cb(null);
}
