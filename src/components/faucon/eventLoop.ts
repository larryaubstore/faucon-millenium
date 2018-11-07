import { Game } 	    from './game';
import { Faucon } 	  from './faucon';
import * as debug  	  from 'debug';
import * as rafLoop   from 'raf-loop';


const log = debug('eventLoop');

export class EventLoop {

	game: Game = null;
  originalHorizontalIndex: number = 0;
  touchStartPos: number = 0;



	constructor(containerWidth: number, containerHeight: number, faucon: Faucon) {
    log('eventLoop');
		this.game = new Game(2, containerWidth, containerHeight, faucon);

	}

  isPaused() {
    return this.game.isPaused;
  }

  isOverlay() {
    return this.game.isOverlay;
  }

  pause() {
    this.game.pause();
  }

  explosion() {
    this.game.explosion();
  }

  hideOverlay() {
    this.game.hideOverlay();
  }

  isInitialMode() {
    return this.game.isInitialMode();
  }


	async initialize() {
		document.onkeydown = this.checkKey.bind(this);
    document.ontouchmove = this.touchMove.bind(this);
    document.ontouchstart = this.touchStart.bind(this);
    

    try {
  		await this.game.initialize();
      var engine = rafLoop((dt) => {
  		  this.run();
      }).start();
    } catch (err) {
      log('error ==> ' + err);
    }
	}

	run() {
		this.game.draw();
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



		


