import { Tile }                       from '../models/tile';

export default function drawMountainsExplosionType(cur: Tile, drawExplosion: boolean) {

  if (cur.indexAnimation <= 5 && cur.indexAnimation !== -1 ) {

    let index = this.aliasMap['explosion_montagne'].length - cur.indexAnimation;

    if (drawExplosion === true) {
      this.context.drawImage(this.imageList[index + this.aliasMap['explosion_montagne'].begin], 
                         this.tileWidth * cur.xPos - 45, 
                         cur.getCalcYPos() - 48, 
                         this.tileWidth * 2, 
                         this.tileHeight * 2);
    } else {
      this.context.drawImage(this.imageList[this.aliasMap['tile'].begin], 
                           this.tileWidth * cur.xPos, 
                           cur.getCalcYPos(), 
                           this.tileWidth, 
                           this.tileHeight);
    }

  } else if (cur.indexAnimation !== -1) {

    let index = this.aliasMap['explosion_montagne'].length - cur.indexAnimation;
    if (drawExplosion === true) {
      this.context.drawImage(this.imageList[index + this.aliasMap['explosion_montagne'].begin], 
                         this.tileWidth * cur.xPos - 45, 
                         cur.getCalcYPos() - 48, 
                         this.tileWidth * 2, 
                         this.tileHeight * 2);
      cur.indexAnimation = cur.indexAnimation - 1;
    } else {
      this.context.drawImage(this.imageList[this.aliasMap['tile'].begin], 
                           this.tileWidth * cur.xPos, 
                           cur.getCalcYPos(), 
                           this.tileWidth, 
                           this.tileHeight);
    }
  }
}
