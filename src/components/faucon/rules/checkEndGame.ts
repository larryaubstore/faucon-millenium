import { Game }         from '../game';
import { Tile }         from '../models/tile';
import { TileType }     from '../models/tileType';

class CheckEndGame {

  game: Game = null;

  constructor(game: Game) {
    this.game = game;
  }

  isEndGameCeil() {
    let indexGrid = Math.ceil(this.game.horizontalIndex) + "-" + this.game.centerPosition;
    let cur: Tile = this.game.liveMap[indexGrid];
    if (cur.collision === 'collisionPirate' && this.game.offsetY > 25) {
      this.game.explosion();
      return true;
    } else {
      return false;
    }
  };


  isEndGameFloor() {
    let indexGrid = Math.floor(this.game.horizontalIndex) + "-" + this.game.centerPosition;
    let cur: Tile = this.game.liveMap[indexGrid];
    if (cur.collision === 'collisionPirate' && this.game.offsetY > 25) {
      this.game.explosion();
      return true;
    } else {
      return false;
    }
  }

  isEndGame() {
    return this.isEndGameFloor() || this.isEndGameCeil();
  }
}

export default function checkEndGame(cb) {
  let checkEndGameInstance = new CheckEndGame(this);
  checkEndGameInstance.isEndGame();
  cb(null);
}
