	import { Utils }					from './utils';
	import * as debug					from 'debug';
  import * as async         from 'async';
  import { Tile }           from './models/tile';

	
	
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

    moduloTile = 0;
    moduloRange = 0;

		imageList: any = [];

    imageListNumber: any = [];

		utils: Utils;

    isPaused = false;

    currentGrid: any = {};

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
      // this.moduloRange = 6;
      this.moduloRange = Math.ceil(this.gameHeight / this.tileHeight) + 1;
      log('moduloRange ' + this.moduloRange);
		}

    pause() {

      this.isPaused = !this.isPaused;
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

        let dataNumber: [string] = [] as any;


        dataNumber = [
          'assets/imgs/number0.png',
          'assets/imgs/number1.png',
          'assets/imgs/number2.png',
          'assets/imgs/number3.png',
          'assets/imgs/number4.png',
          'assets/imgs/number5.png',
          'assets/imgs/number6.png',
          'assets/imgs/number7.png',
          'assets/imgs/number8.png',
          'assets/imgs/number9.png'];

				var imagePtr: any = null;
				for(var i = 0; i < data.length; i++) {
					imagePtr = new Image();
					imagePtr.onload = this.waitImageLoading;
					imagePtr.src = data[i];
					this.imageList.push(imagePtr);
				}

        for (var i = 0; i < dataNumber.length; i++) {
					imagePtr = new Image();
					imagePtr.onload = this.waitImageLoading;
					imagePtr.src = dataNumber[i];
					this.imageListNumber.push(imagePtr);
        }


				this.context = ( document.getElementById("viewport") as any).getContext("2d");
				this.entities = [];
        /*************/
        let index = 0;
        let tile: Tile = null;
        
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < this.moduloRange; j++) {
            index = i;
            
            tile = new Tile(this.imageList[Math.floor(Math.random() * 2)], 
                            i, 
                            j, 
                            this.tileWidth, 
                            this.tileHeight, 
                            0, 
                            this.context); 

            this.currentGrid[i + "-" + j] = tile; 
          }
        }
        /*************/
		

			});
		}

		draw() {


      async.waterfall([


        function isPaused(cb) {
          if (this.isPaused === true) {
            cb("isPaused");
          } else {
            cb(null);
          }
        }.bind(this),
         
        function drawBoard(cb) {

          this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
          let tilePtr = null;
          let realNumber =  0;
          let indexGrid: string = null;

          let cur = null; 
          for (let i = 0; i < 5; i++) {
            for (let j = 0; j < this.moduloRange; j++) {
              indexGrid = i + "-" + j;
              realNumber = ( ( (j + this.moduloTile ) % this.moduloRange) );

              cur = this.currentGrid[indexGrid];
              tilePtr = cur.imagePtr;
              cur.setYPos(this.tileHeight * (realNumber-1)  +  this.offsetY);

              this.context.drawImage(tilePtr, 
                                     cur.xPos * this.tileWidth, 
                                     cur.yPos, 
                                     this.tileWidth, 
                                     this.tileHeight);

              if (typeof(this.imageListNumber[cur.initialYPos]) !== 'undefined') {
                  
                this.context.drawImage(this.imageListNumber[cur.initialYPos], 
                                       0, 
                                       this.tileHeight * (j-1)  +  this.offsetY, 
                                       this.tileWidth, 
                                       this.tileHeight);


              }
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

  






