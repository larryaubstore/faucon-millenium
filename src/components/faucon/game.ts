	import { Utils }					from './utils';
	import * as debug					from 'debug';
  import * as async         from 'async';

	
	
	const log = debug('game');
  
	export class Game {

		fps = 20;
		horizontalIndex = 0;
		verticalIndex = 0;
		entities = [];
		context: any = null;

		tileWidth = 0;
		tileHeight = 0;

		gameWidth = 0;
		gameHeight = 0;

		offsetY = 0;

		imageList: any = [];

		utils: Utils;

		constructor(fps: number, 
                horizontalIndex: number, 
                containerWidth: number, 
                containerHeight: number) {
			this.fps = fps;
			this.horizontalIndex = horizontalIndex;
			this.utils = new Utils();

			// this.tileWidth = 180 / 2;
			// this.tileHeight = 192 / 2;

			this.tileWidth = 82;
			this.tileHeight = 87;

			this.gameWidth = containerWidth;
			this.gameHeight = containerHeight;

			this.offsetY = 0;

      this.moduloTile = 0;
      this.moduloRange = 12;
			
		}

		waitImageLoading() {
			log('waitImageLoading');
		}

		initialize() {

			log('initialize');
			this.utils.loadJSON('map.json', (data: any) => {


				data = ['assets/imgs/tileOne.png', 
						'assets/imgs/tileTwo.png',
						'assets/imgs/faucon.png',
						'assets/imgs/picking_green.png'
        ];

				var imagePtr: any = null;
				for(var i = 0; i < data.length; i++) {
					imagePtr = new Image();
					imagePtr.onload = this.waitImageLoading;
					imagePtr.src = data[i];
					this.imageList.push(imagePtr);
				}
		

				this.entities = [];
				this.context = ( document.getElementById("viewport") as any).getContext("2d");
			});
		}

		draw() {


			log('tileWidth  ==> ' + this.tileWidth);
			log('tileHeight ==> ' + this.tileHeight);

      async.waterfall([
       
         
        function drawBoard(cb) {

          this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
          let index = 0;
          for (let i = 0; i < 5; i++) {
            for (let j = -1; j < 11; j++) {
              if ( (i + j) % 2 === 0 ) {
                index = 0;
              } else {
                index = 1;
              }
              this.context.drawImage(this.imageList[index], 
                                     this.tileWidth * i, 
                                     this.tileHeight *   ( ( (j + this.moduloTile ) % this.moduloRange) - 1 )  +  this.offsetY, 
                                     this.tileWidth, 
                                     this.tileHeight);

            }
          }
          cb(null);
        }.bind(this),

        function checkLimitOneLine(cb) {

          cb(null);
        }.bind(this), 

        function (cb) {
          this.offsetY = (this.offsetY + 1)
          
          if (this.offsetY > this.tileHeight) {
            this.offsetY = 0;
            this.moduloTile = (this.moduloTile + 1 ) % this.moduloRange;
          }

          cb(null);

        }.bind(this), 


        function drawFaucon(cb) {

          

          this.context.drawImage(this.imageList[2], 
                                 this.tileWidth * this.horizontalIndex, 
                                 this.tileHeight * this.verticalIndex, 
                                 this.tileWidth, 
                                 this.tileHeight);

          this.context.drawImage(this.imageList[3], 
                               this.tileWidth * this.horizontalIndex, 
                               this.tileHeight * this.verticalIndex + 1, 
                               this.tileWidth, 
                               this.tileHeight);
          cb(null);
        }.bind(this)
        ], (err: any) => {


        });


		}

	  up() {
			console.log('UP');
			this.verticalIndex = this.verticalIndex - 1;
			if (this.verticalIndex < 0) {
				this.verticalIndex = 0;
			}

		}
	
		down () {
			console.log('DOWN');
			this.verticalIndex = this.verticalIndex + 1;
			if (this.verticalIndex > 9) {
				this.verticalIndex = 9;
			}

		}
	
		left () {
			console.log('LEFT');
			this.horizontalIndex = this.horizontalIndex - 1;
			if (this.horizontalIndex < 0) {
				this.horizontalIndex = 0;
			}
		}
	
		right () {
			console.log('RIGHT');
			this.horizontalIndex = this.horizontalIndex + 1;
			if (this.horizontalIndex > 5) {
				this.horizontalIndex = 5;
			}
		}
	
}

  






