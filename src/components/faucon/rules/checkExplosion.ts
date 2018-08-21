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
  if (this.isExplosion <= 5 && this.isExplosion !== -1 ) {

    // On réajuste pour que l'animation s'enchaîne dans l'ordre chronologique
    // et non l'ordre descendant.
    let index = this.aliasMap['explosion'].length - this.isExplosion;
    this.context.drawImage(this.imageList[index + this.aliasMap['explosion'].begin], 
                         this.tileWidth * this.horizontalIndex - 45 , 
                         this.tileHeight * this.verticalIndex +  this.offsetY - (96 / 2), 
                         this.tileWidth * 2, 
                         this.tileHeight * 2);


    cb('SKIP');
  } else if (this.isExplosion !== -1) {

    log('isExplosion => ' + this.isExplosion);
    let index = this.aliasMap['explosion'].length - this.isExplosion;
    this.context.drawImage(this.imageList[index + this.aliasMap['explosion'].begin], 
                         this.tileWidth * this.horizontalIndex - 45, 
                         this.tileHeight * this.verticalIndex +  this.offsetY - (96 / 2), 
                         this.tileWidth * 2, 
                         this.tileHeight * 2);


    this.isExplosion = this.isExplosion - 1;
    cb('SKIP');
  } else {
    cb(null);
  }

}
