import * as debug			              from 'debug';
import * as async                   from 'async';
import { Faucon }                   from './faucon';
import { Tile }                     from './models/tile';
import { TileType }                 from './models/tileType';


import isPaused                     from './rules/isPaused';
import drawBoard                    from './rules/drawBoard';
import checkBlocked                 from './rules/checkBlocked';
import checkEndGame                 from './rules/checkEndGame';
import checkExplosion               from './rules/checkExplosion';
import drawFaucon                   from './rules/drawFaucon';
import drawMountainsExplosionType   from './rules/drawMountainsExplosionType'; 

import loadMapJson                  from './rules/loadMapJson';
import initContext                  from './rules/initContext';
import loadImages                   from './rules/loadImages';
import buildGrid                    from './rules/buildGrid';
import moveFauconDemoMode           from './rules/moveFauconDemoMode';
import oneMoreLine                  from './rules/oneMoreLine';
import drawRideau                   from './rules/drawRideau';

	
	
const log = debug('game');
  
export class Game {

    faucon: Faucon = null;
		fps = 0;
		horizontalIndex = 2;
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
    currentModuloTile = 0;
    collisionOffsetX = 0;
    collisionOffsetY = 0;
    isExplosion = -1;
    isExplosionMountains = -1;
    isRideauAnimation = -1;
    centerPosition = 2;


    collisionList: any = [];
    srcList: any = [];
	  imageList: any = [];
    explosionMap: any = [];

    /*
     *  On prend le fichier JSON et la propriété 'images'.
     *  Par exemple:
     *    JSON
     *    ...images
     *       ...tile
     *       ...faucon
     */
    aliasMap: any = {};

    /*
     * Propriété pour mettre en pause le jeu
     */
    isPaused = false;

    /*
     * Propriété pour mettre un 'overlay'
     */
    isOverlay = true;

    /*
     * Grille [rangée-colonne]
     */
    gridMap: any = {};


    realPositionMap: any = {};


    /*
     * Grille [rangée-colonne] 
     * pour obtenir l'état
     * de la grille en temps réel
     */
    liveMap: any = {};

    jsonData: any = null;

    frameCounter = 0;

		constructor(horizontalIndex: number, 
                containerWidth: number, 
                containerHeight: number,
                faucon: Faucon) {
			this.horizontalIndex = horizontalIndex;

			this.gameWidth = containerWidth;
			this.gameHeight = containerHeight;

			this.offsetY = 0;
      this.moduloTile = 0;
      this.currentModuloTile = 0;
      this.faucon = faucon;
		}

    pause() {
      this.isPaused = !this.isPaused;
      this.isOverlay = this.isPaused;
    }

    hideOverlay() {
      this.isOverlay = false;
    }

		isInitialMode() {
    	return !this.isPaused && this.isOverlay;
   	}

    /*
     * Méthode qui provoque une explosion et/ou 
     * qui bascule en mode normal
     *    -1 ==> pas d'explosion
     *    > -1 en animation du mode explosion
     *
     */
    explosion() {

      if (this.isExplosion === -1) {
        this.verticalIndex = this.centerPosition;
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

          async.waterfall([

            loadMapJson.bind(this),

            initContext.bind(this),

            loadImages.bind(this),

            buildGrid.bind(this)

          ], (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(null);
              }
          });
        });
    }

		draw() {

      /*
       * Chaîne de montage pour le rendu
       *      cb('SKIP') est pour interrompre la chaîne
       */
      async.waterfall([


        isPaused.bind(this),
        
        drawBoard.bind(this),
        
        checkExplosion.bind(this),

        drawFaucon.bind(this),

        function(cb) {
          let indexGrid: string = null;
          let cur: Tile = null; 
          for (let i = 0; i < 5; i++) {
            for (let j = 0; j < this.moduloRange; j++) {
              indexGrid = i + "-" + j;
              cur = this.gridMap[indexGrid];
              if (cur.tileType === TileType.MountainExplosion) {
                  drawMountainsExplosionType.bind(this)(cur, true);
              }
            }
          }
          cb(null);
        }.bind(this),

        moveFauconDemoMode.bind(this),
        
        checkBlocked.bind(this),

        checkEndGame.bind(this),

        drawRideau.bind(this),
        
        oneMoreLine.bind(this)


       ], (err: any) => {
          if (err === 'SKIP') {

          } else if (err) {
            console.log(err);
          }
        });
		}

	  up() {
			log('UP');
			this.verticalIndex = this.verticalIndex - 1;
			if (this.verticalIndex < 0) {
				this.verticalIndex = 0;
			}

		}
	
		down () {
			log('DOWN');
			this.verticalIndex = this.verticalIndex + 1;
			if (this.verticalIndex > 9) {
				this.verticalIndex = 9;
			}

		}
	
    left () {
      if (this.isExplosion === -1) {
        log('LEFT');
        this.horizontalIndex = Math.floor(this.horizontalIndex);
        this.horizontalIndex = this.horizontalIndex - 1;
        if (this.horizontalIndex < 0) {
          this.horizontalIndex = 0;
        }
      }
		}
	
		right () {
      if (this.isExplosion === -1) {
        log('RIGHT');
        this.horizontalIndex = Math.floor(this.horizontalIndex);
        this.horizontalIndex = this.horizontalIndex + 1;
        if (this.horizontalIndex > 4) {
          this.horizontalIndex = 4;
        }
      }
		}

  moveHorizontally(xPos: number) {
    if (this.isExplosion === -1) {
      log('moveHorizontally');
      if (xPos <= 0) {
        this.horizontalIndex = 0;
      } else if (xPos >= 4) {
        this.horizontalIndex = 4;
      } else {
        this.horizontalIndex = xPos as any;
      }
    }
  }
}
