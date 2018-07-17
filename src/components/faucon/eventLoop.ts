import { Game } 	from './game';
import * as debug  	from 'debug';


const log = debug('eventLoop');

export class EventLoop {

	game: Game = null;


	constructor(containerWidth: number, containerHeight: number) {
		this.game = new Game(30, 0, containerWidth, containerHeight);

	}


	initialize() {
		document.onkeydown = this.checkKey.bind(this);

		this.game.initialize();
		this.run();
	}

	run() {
		var loops = 0, skipTicks = 1000 / this.game.fps;




		this.game.draw();
		//this.game.up();

		setTimeout(() => {
			this.run();
		}, skipTicks);

		

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



		


