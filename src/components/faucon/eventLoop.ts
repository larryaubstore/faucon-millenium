import { Game } 	from './game';
import * as debug  	from 'debug';


const log = debug('eventLoop');

export class EventLoop {

	game: Game = null;


	constructor(containerWidth: number, containerHeight: number) {
    log('eventLoop');
		this.game = new Game(30, 0, containerWidth, containerHeight);

	}


	initialize() {
		document.onkeydown = this.checkKey.bind(this);

		this.game.initialize();
		this.run();
	}

	run() {
		let skipTicks = 1000 / this.game.fps;




		this.game.draw();
		setTimeout(() => {
			this.run();
		}, skipTicks);

		

	}


  handleStart(evt: any) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    
    if (touches.length > 1) {
      //let xTouch = touches[0].pageX;
      //let yTouch = touches[0].pageY;
    }

          
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



		


