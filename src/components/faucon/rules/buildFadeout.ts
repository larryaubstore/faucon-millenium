import { Tile }                       from '../models/tile';
import drawFadeout                    from './drawFadeout';
import buildGrid                      from './buildGrid';

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
    cb(null);
  } else if (this.isRideauAnimation === 1 && this.isFadeoutAnimation === -1) {
    this.isFadeoutAnimation = this.aliasMap['fadeout'].length;
    cb(null);
  } else if (this.isRideauAnimation === 1 && this.isFadeoutAnimation === 1) {
    buildGrid.bind(this)( (err: any) => {
      if (err) {
        cb(err);
      } else {
        this.isRideauAnimation = -1;
        this.isFadeoutAnimation = -1;
        this.isExplosion = -1;
        this.isOverlay = true;
        cb(null);
      }
    });
  } else {
    cb(null);
  }
}
