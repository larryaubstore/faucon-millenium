export default function drawFaucon(cb) {

  
  this.context.drawImage(this.imageList[this.aliasMap['faucon'].begin], 
                         this.tileWidth * this.horizontalIndex, 
                         this.tileHeight * this.centerPosition + this.collisionOffsetY, 
                         this.tileWidth, 
                         this.tileHeight);

  // this.context.drawImage(this.imageList[this.aliasMap['faucon'].begin + 1], 
  //                      this.tileWidth * this.horizontalIndex, 
  //                      this.tileHeight * this.verticalIndex + 1 +  this.offsetY, 
  //                      this.tileWidth, 
  //                      this.tileHeight);
  cb(null);
}
