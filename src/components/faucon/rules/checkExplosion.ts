import * as debug					from 'debug';
const log = debug('rule:explosion');

/*
 * Animation pour l'explosion du faucon
 * La valeur initiale de 'isExplosion' est égale à la taille du tableau
 * des images de l'animation.
 * Par exemple, en séquence, on obtient:
 *      100
 *       99 
 *       98
 *       97
 *       96
 *       ..
 *       5
 */
export default function checkExplosion(cb) {

    if (this.isExplosion <= 1 && this.isExplosion !== -1 ) {

      // On réajuste pour que l'animation s'enchaîne dans l'ordre chronologique
      // et non l'ordre descendant.
      let index = this.aliasMap['explosion'].length - this.isExplosion;
      this.context.drawImage(this.imageList[index + this.aliasMap['explosion'].begin], 
                           this.tileWidth * this.horizontalIndex - (135), 
                           this.tileHeight * this.verticalIndex +  this.offsetY - (196 - 48), 
                           this.tileWidth * 4, 
                           this.tileHeight * 4);

      if (this.isFadeoutAnimation === 1) {
        this.isExplosion = 2;
      }
      cb(null);
    } else if (this.isExplosion !== -1) {

      log('isExplosion => ' + this.isExplosion);
      let index = this.aliasMap['explosion'].length - this.isExplosion;
      this.context.drawImage(this.imageList[index + this.aliasMap['explosion'].begin], 
                           this.tileWidth * this.horizontalIndex - (135), 
                           this.tileHeight * this.verticalIndex +  this.offsetY - (196 - 48), 
                           this.tileWidth * 4, 
                           this.tileHeight * 4);


      if (this.isFadeoutAnimation !== 1) {
        this.isExplosion--;
      } else {
        if (this.isExplosion < this.aliasMap['explosion'].length) {
          this.isExplosion++;
        }
      }
      cb(null);
    } else {
      cb(null);
    }
}
