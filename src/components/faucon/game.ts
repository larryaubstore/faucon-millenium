	import * as debug					from 'debug';
  import * as async         from 'async';
  import { Tile }           from './models/tile';


  import isPaused           from './rules/isPaused';
  import drawBoard          from './rules/drawBoard';
  import checkBlocked       from './rules/checkBlocked';
  import checkExplosion     from './rules/checkExplosion';
  import drawFaucon         from './rules/drawFaucon';

  import loadMapJson        from './rules/loadMapJson';
  import initContext        from './rules/initContext';
  import loadImages         from './rules/loadImages';
  import buildGrid          from './rules/buildGrid';
	
	
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
    collisionOffsetX = 0;
    collisionOffsetY = 0;
    isExplosion = -1;
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
     * Grille [rangée-colonne]
     */
    gridMap: any = {};

    /*
     * Grille [rangée-colonne] 
     * pour obtenir l'état
     * de la grille en temps réel
     */
    liveMap: any = {};

    jsonData: any = null;

		constructor(fps: number, 
                horizontalIndex: number, 
                containerWidth: number, 
                containerHeight: number) {
			this.fps = fps;
			this.horizontalIndex = horizontalIndex;

			this.gameWidth = containerWidth;
			this.gameHeight = containerHeight;

			this.offsetY = 0;
      this.moduloTile = 0;
		}

    pause() {
      this.isPaused = !this.isPaused;
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


    isBlocked() {
        let indexGrid = Math.ceil(this.horizontalIndex) + "-" + this.centerPosition;
        let cur: Tile = this.liveMap[indexGrid];
        if (cur.collision === 'collision' && this.offsetY > 25) {
          return true;
        } else {
          return false;
        }
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
        
        checkBlocked.bind(this), 

        checkExplosion.bind(this),

        drawFaucon.bind(this)


       ], (err: any) => {
          if (err === 'SKIP') {

          } else {

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
			log('LEFT');
			this.horizontalIndex = this.horizontalIndex - 1;
			if (this.horizontalIndex < 0) {
				this.horizontalIndex = 0;
			}
		}
	
		right () {
			log('RIGHT');
			this.horizontalIndex = this.horizontalIndex + 1;
			if (this.horizontalIndex > 5) {
				this.horizontalIndex = 5;
			}
		}

    moveHorizontally(xPos: number) {
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

  






