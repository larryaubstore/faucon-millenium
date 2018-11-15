import { Tile }                       from '../models/tile';
import drawFadeout                    from './drawFadeout';

export default function buildFadeout(cb) {

  let tilePtr = null;
  let indexGrid: string = null;

  let cur: Tile = null; 
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < this.moduloRange; j++) {
      indexGrid = i + "-" + j;
      cur = this.gridMap[indexGrid];
      tilePtr = cur.imagePtr;
      drawFadeout.bind(this)(cur);
    }
  }

  if (this.isFadeoutAnimation !== -1 && this.isFadeoutAnimation !== 1) {
    this.isFadeoutAnimation--;
  } else if (this.isRideauAnimation === 1 && this.isFadeoutAnimation === -1) {
    this.isFadeoutAnimation = this.aliasMap['fadeout'].length;
  }
  cb(null);
}
