import * as debug					      from 'debug';


const log = debug('rule:mountains');

export default function checkExplosionMountains(cb) {
  log('checkExplosionMountains');
  if (this.isExplosionMountains <= 5 && this.isExplosionMountains !== -1 ) {

    let index = this.aliasMap['explosion_montagne'].length - this.isExplosionMountains;
    this.context.drawImage(this.imageList[index + this.aliasMap['explosion_montagne'].begin], 
                         this.tileWidth * this.horizontalIndex, 
                         this.tileHeight * this.verticalIndex +  this.offsetY, 
                         this.tileWidth, 
                         this.tileHeight);


    cb('SKIP');
  } else if (this.isExplosionMountains !== -1) {

    log('isExplosion => ' + this.isExplosionMountains);
    let index = this.aliasMap['explosion_montagne'].length - this.isExplosionMountains;
    this.context.drawImage(this.imageList[index + this.aliasMap['explosion_montagne'].begin], 
                         this.tileWidth * this.horizontalIndex, 
                         this.tileHeight * this.verticalIndex +  this.offsetY, 
                         this.tileWidth, 
                         this.tileHeight);


    this.isExplosionMountains = this.isExplosionMountains - 1;
    cb('SKIP');
  } else {
    cb(null);
  }
}
