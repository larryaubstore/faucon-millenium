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

    aliasMap: any = {};

    srcList: any = [];


		utils: Utils;

    isPaused = false;

    isExplosion = -1;

    currentGrid: any = {};

		constructor(fps: number, 
                horizontalIndex: number, 
                containerWidth: number, 
                containerHeight: number) {
			this.fps = fps;
			this.horizontalIndex = horizontalIndex;
			this.utils = new Utils();

			this.gameWidth = containerWidth;
			this.gameHeight = containerHeight;

			this.offsetY = 0;
      this.moduloTile = 0;
		}

    pause() {
      this.isPaused = !this.isPaused;
    }

    explosion() {

      if (this.isExplosion === -1) {
        this.isExplosion =  this.aliasMap['explosion'].length;
      } else {
        this.isExplosion = -1; 
      }
    }

		waitImageLoading() {
			log('waitImageLoading');
		}

		async initialize() {
      log('initialize');
      return new Promise( (resolve, reject) => {
        this.context = ( document.getElementById("viewport") as any).getContext("2d");

        let jsonData: any = null;
        async.waterfall([

          function loadMapJson(cb: any) {
            this.utils.loadJSON('./assets/json/map.json', (data: any) => {
              cb(null, data);
            });
          }.bind(this),
          (json: any, cb: any) => {

            jsonData = json;
            this.tileWidth = jsonData['tileWidth'];
            this.tileHeight = jsonData['tileHeight'];
            this.moduloRange = Math.ceil(this.gameHeight / this.tileHeight) + 1;


            cb(null);
          }, 
          function loadImages(cb: any) {

            let total = 0;
            for (var name in jsonData['images']) {
                if (jsonData['images'].hasOwnProperty(name)) {
                    this.aliasMap[name] = { 
                      begin: total, 
                      end: total + jsonData['images'][name].length,
                      length: jsonData['images'][name].length - total
                    };
                    total = total + jsonData['images'][name].length;


                    for (var i = 0; i < jsonData['images'][name].length; i++) {
                      this.srcList.push(jsonData['images'][name][i]);
                    }
                }
            } 

            let count = 0;
            async.whilst( () => {

              log( 'count ==> ' + count);
              log( 'total ==> ' +  (total));
              return count < (total);
            }, 
            (eachCb: any) => {
              var imagePtr: any = null;


              if (count < total) {
                imagePtr = new Image();
                imagePtr.onload = async.apply(function(cb) { cb(null); }, eachCb);
                imagePtr.src = this.srcList[count];
                this.imageList.push(imagePtr);
              } 
              count++;

           }, (err: any, n: number) => {
              if (err) {
                cb(err);
              } else {
                cb(null);
              }
           });
         }.bind(this),
         function buildGrid(cb: any) {

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

            cb(null);
         }.bind(this)], (err) => {

            if (err) {
              reject(err);
            } else {
              resolve(null);
            }
         });
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

              
              if (cur.initialYPos <= this.aliasMap['number'].length + 2) {    
                this.context.drawImage(this.imageList[this.aliasMap['number'].length + cur.initialYPos - 1], 
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
            this.verticalIndex = this.verticalIndex + 1;
          }

          cb(null);

        }.bind(this), 

        function checkExplosion(cb) {


          if (this.isExplosion <= 5 && this.isExplosion !== -1 ) {

            let index = this.aliasMap['explosion'].length - this.isExplosion;

            ///////////////

            this.context.drawImage(this.imageList[index + this.aliasMap[explosion].begin], 
                                 this.tileWidth * this.horizontalIndex - 45 , 
                                 this.tileHeight * this.verticalIndex +  this.offsetY - (96 / 2), 
                                 this.tileWidth * 2, 
                                 this.tileHeight * 2);


            cb('SKIP');
          } else if (this.isExplosion !== -1) {

            log('isExplosion => ' + this.isExplosion);
            let index = this.aliasMap['explosion'].length - this.isExplosion;
            //log('explosion INDEX => ' + index);
            this.context.drawImage(this.imageList[index + this.aliasMap[explosion].begin], 
                                 this.tileWidth * this.horizontalIndex - 45, 
                                 this.tileHeight * this.verticalIndex +  this.offsetY - (96 / 2), 
                                 this.tileWidth * 2, 
                                 this.tileHeight * 2);


            this.isExplosion = this.isExplosion - 1;
            cb('SKIP');
          } else {
            cb(null);
          }

        }.bind(this),
 

        function drawFaucon(cb) {

          
          this.context.drawImage(this.imageList[2], 
                                 this.tileWidth * this.horizontalIndex, 
                                 this.tileHeight * this.verticalIndex +  this.offsetY, 
                                 this.tileWidth, 
                                 this.tileHeight);

          this.context.drawImage(this.imageList[3], 
                               this.tileWidth * this.horizontalIndex, 
                               this.tileHeight * this.verticalIndex + 1 +  this.offsetY, 
                               this.tileWidth, 
                               this.tileHeight);
          cb(null);
        }.bind(this)
        ], (err: any) => {
          if (err === 'SKIP') {

          } else {

          }
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

  






