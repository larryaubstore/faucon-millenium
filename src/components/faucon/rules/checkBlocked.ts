import { Game }         from '../game';
import { Tile }         from '../models/tile';
import { TileType }     from '../models/tileType';

class CheckBlockedRule {

  game: Game = null;

  constructor(game: Game) {
    this.game = game;
  }

  checkCollisionGen(horizontalIndex: number, verticalIndex: number) {
    let indexGrid = horizontalIndex + "-" + verticalIndex;
    let cur: Tile = this.game.liveMap[indexGrid];
    if (cur.collision === 'collision' && this.game.offsetY > 25) {
      // On transforme la tuile en type explosion 'montagne
      indexGrid = horizontalIndex + "-" + verticalIndex;
      cur = this.game.liveMap[indexGrid];
      this.startExplosion(cur);
      return true;
    } else {
      return false;
    }
  }

  startExplosion(cur: Tile) {
    if (cur.tileType === TileType.Normal) {
      cur.collision = 'nocollision';
      cur.tileType = TileType.MountainExplosion;
      cur.indexAnimation = this.game.aliasMap['explosion_montagne'].length - 1;
      if (this.game.isOverlay === false) {
        this.game.faucon.score++;
      }
    } 
  }

  checkCollisionCeil() {
    return this.checkCollisionGen(Math.ceil(this.game.horizontalIndex), this.game.centerPosition);
  }

  checkCollisionFloor() {
    return this.checkCollisionGen(Math.floor(this.game.horizontalIndex), this.game.centerPosition);
  }

  checkVerticalCollisionGen(horizontalIndex: number, verticalIndex: number) {
    let indexGrid = horizontalIndex + "-" + verticalIndex; 
    let cur: Tile = this.game.liveMap[indexGrid];
    if (cur.collision === 'collision') {
      this.startExplosion(cur);
    }
  }

  checkVerticalCollision() {
    this.checkVerticalCollisionGen(Math.ceil(this.game.horizontalIndex), this.game.centerPosition + 1);
    this.checkVerticalCollisionGen(Math.floor(this.game.horizontalIndex), this.game.centerPosition + 1);
  }

  checkCollision() {
    this.checkVerticalCollision();
    return this.checkCollisionFloor() || this.checkCollisionCeil();
  }
}

export default function checkBlocked(cb) {

  let checkBlockedInstance = new CheckBlockedRule(this);
  if (checkBlockedInstance.checkCollision()) {
     // ne rien faire
  } else {


    if (this.isExplosion === -1) {
      if (this.offsetY == this.tileHeight) {
        this.offsetY = 0;
        this.moduloTile = (this.moduloTile + 1 ) % this.moduloRange;
        this.verticalIndex = this.verticalIndex + 1;
      } else {
        this.offsetY = (this.offsetY + 3)
      }
    }
  }
  cb(null);
}
