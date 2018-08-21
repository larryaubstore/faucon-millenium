import { Game } 	from './game';
import * as debug  	from 'debug';


const log = debug('eventLoop');

export class EventLoop {

	game: Game = null;
  originalHorizontalIndex: number = 0;
  touchStartPos: number = 0;



	constructor(containerWidth: number, containerHeight: number) {
    log('eventLoop');
		this.game = new Game(30, 0, containerWidth, containerHeight);

	}


  pause() {
    this.game.pause();
  }

  explosion() {
    this.game.explosion();
  }


	async initialize() {
		document.onkeydown = this.checkKey.bind(this);
    document.ontouchmove = this.touchMove.bind(this);
    document.ontouchstart = this.touchStart.bind(this);
    

    try {
  		await this.game.initialize();
		  this.run();
    } catch (err) {
      log('error ==> ' + err);
    }
	}

	run() {
		let skipTicks = 1000 / this.game.fps;

		this.game.draw();
		setTimeout(() => {
			this.run();
		}, skipTicks);
	}


  touchStart(evt: any) {
    log('touchStart');
    log(evt.changedTouches[0].pageX);
    this.originalHorizontalIndex = this.game.horizontalIndex;
    this.touchStartPos = evt.changedTouches[0].pageX;

  }

  touchMove(evt: any) {
    log('touchMove');
    log(evt.changedTouches[0].pageX);

     let delta: number = (this.touchStartPos - evt.changedTouches[0].pageX) / (window.innerWidth / 5);
     this.game.moveHorizontally(this.originalHorizontalIndex - delta);

    
    // let xPos: number = (evt.changedTouches[0].pageX - 50) /  window.innerWidth * 5;
    // this.game.moveHorizontally(xPos);

  }

	checkKey(e: any) {
		e = e || window.event;

		console.log('verticalIndex 		==> ' + this.game.verticalIndex);
		console.log('horizontalIndex 	==> ' + this.game.horizontalIndex);

		if (e.keyCode == '38') {
			this.game.up();
		}
		else if (e.keyCode == '40') {
			this.game.down();
		}
		else if (e.keyCode == '37') {
			this.game.left();
		}
		else if (e.keyCode == '39') {
			this.game.right();
		}

	}
}



		


