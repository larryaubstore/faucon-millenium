import { Tile }                       from '../models/tile';

export default function drawRideau(cb: any) {

  if (this.isExplosion === 1) {

    // On démarre l'animation
    if (this.isRideauAnimation === -1) {
      this.isRideauAnimation = this.aliasMap['rideau'].length;
    }

    if (this.isRideauAnimation <= 1 && this.isRideauAnimation !== -1 ) {
      let index = this.aliasMap['rideau'].length - this.isRideauAnimation;
      if (this.isRideauAnimation !== -1) {
        this.context.drawImage(this.imageList[index + this.aliasMap['rideau'].begin], 
                           this.tileWidth * this.horizontalIndex, 
                           this.tileHeight * this.verticalIndex, 
                           this.tileWidth, 
                           this.tileHeight);
      }
    } else if (this.isRideauAnimation !== -1) {
      let index = this.aliasMap['rideau'].length - this.isRideauAnimation;
      if (this.isRideauAnimation !== -1) {
        this.context.drawImage(this.imageList[index + this.aliasMap['rideau'].begin], 
                           this.tileWidth * this.horizontalIndex, 
                           this.tileHeight * this.verticalIndex , 
                           this.tileWidth, 
                           this.tileHeight);
        this.isRideauAnimation--;
      } 
    }
  }
  cb(null);
}
