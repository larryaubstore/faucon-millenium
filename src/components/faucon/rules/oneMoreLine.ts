import { TileType }                   from '../models/tileType';
import { Tile }                       from '../models/tile';

export default function oneMoreLine(cb) {


  if (this.isExplosion === -1) {
    let cur: Tile = null;
    let indexRandom: any = null;
    let collisionType = null;
    let collsionListIndex = 0;

    if (this.moduloTile !== this.currentModuloTile) {

      this.currentModuloTile = this.moduloTile;
      let realIndexGrid: string = null;
      let piratePerLine = 0;

      let scoreFormatted = "";
      
      switch(this.score.toString().length) {
        case 1:
          scoreFormatted = "0000" + this.score;
          break;
        case 2:
          scoreFormatted = "000" + this.score;
          break;
        case 3:
          scoreFormatted = "00" + this.score;
          break;
        case 4:
          scoreFormatted = "0" + this.score;
          break;
        case 5:
          scoreFormatted = this.score.toString();
          break;
      }

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


        if ( (this.score % 10) === 0) {

          let numberPerRow = -1;
          switch(i) {

            case 0:
              if (this.score >= 10000) {
                numberPerRow = parseInt(scoreFormatted.substr(0, 1));
              } 
              break;
            case 1:
              if (this.score >= 1000) {
                numberPerRow = parseInt(scoreFormatted.substr(1, 1));
              }
              break;
            case 2:
              if (this.score >= 100) {
                numberPerRow = parseInt(scoreFormatted.substr(2, 1));
              }
              break;
            case 3:
              if (this.score >= 10) {
                numberPerRow = parseInt(scoreFormatted.substr(3, 1));
              }
              break;
            case 4:
              numberPerRow = parseInt(scoreFormatted.substr(4, 1));
              break;
          }

          if (numberPerRow !== -1) {
            cur.imagePtr = this.imageList[this.aliasMap['numbers'].begin + numberPerRow];
            cur.collision = this.collisionList[0];
            cur.indexAnimation = -1;
          } else {
            cur.imagePtr = this.imageList[indexRandom];
            cur.collision = this.collisionList[indexRandom - this.aliasMap['tile'].begin];
            cur.indexAnimation = -1;
          }
      } else {
          cur.imagePtr = this.imageList[indexRandom];
          cur.collision = this.collisionList[indexRandom - this.aliasMap['tile'].begin];
          cur.indexAnimation = -1;
        }
      }

      if (this.isOverlay === false) {
        this.score++;
      }
    }
  }
  cb(null);
}
