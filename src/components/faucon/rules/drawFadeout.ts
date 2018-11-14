import { Tile }                       from '../models/tile';

export default function drawFadeout(cur: Tile) {
  if (this.isFadeoutAnimation <= 1 && this.isFadeoutAnimation !== -1 ) {
    let index = this.aliasMap['fadeout'].length - this.isFadeoutAnimation;
    this.context.drawImage(this.imageList[index + this.aliasMap['fadeout'].begin], 
                         this.tileWidth * cur.xPos, 
                         cur.getCalcYPos(), 
                         this.tileWidth, 
                         this.tileHeight);
  } else if (this.isFadeoutAnimation !== -1) {
    let index = this.aliasMap['fadeout'].length - this.isFadeoutAnimation;
    this.context.drawImage(this.imageList[index + this.aliasMap['fadeout'].begin], 
                         this.tileWidth * cur.xPos, 
                         cur.getCalcYPos(), 
                         this.tileWidth, 
                         this.tileHeight);
  } 
}
