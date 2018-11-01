import { Game }         from '../game';
import { Tile }         from '../models/tile';
import { TileType }     from '../models/tileType';

class CheckEndGame {

  game: Game = null;

  constructor(game: Game) {
    this.game = game;
  }

  isEndGameRound() {
    let indexGrid = Math.round(this.game.horizontalIndex) + "-" + this.game.centerPosition;
    let cur: Tile = this.game.liveMap[indexGrid];
    if (cur.collision === 'collisionPirate' && this.game.offsetY > 25) {
      this.game.explosion();
      return true;
    } else {
      return false;
    }
 
  }

  isEndGame() {
    return this.isEndGameRound();
  }
}

export default function checkEndGame(cb) {
  let checkEndGameInstance = new CheckEndGame(this);
  checkEndGameInstance.isEndGame();
  cb(null);
}
