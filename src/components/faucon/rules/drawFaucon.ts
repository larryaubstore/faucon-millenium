export default function drawFaucon(cb) {


  if (this.isExplosion === -1) {
    this.context.drawImage(this.imageList[this.aliasMap['faucon'].begin], 
                           this.tileWidth * this.horizontalIndex, 
                           this.tileHeight * this.centerPosition + this.collisionOffsetY, 
                           this.tileWidth, 
                           this.tileHeight);
  }
  cb(null);
}
