import * as debug                   from 'debug';
import * as async                   from 'async';
import { Faucon }                   from './faucon';
import { Tile }                     from './models/tile';
import { TileType }                 from './models/tileType';
import { Storage }                  from '@ionic/storage';


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
import buildFadeout                 from './rules/buildFadeout';

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

    /*
     * Propriété pour l'animation de l'explosion du faucon 
     */
    isExplosion = -1;

    /*
     * Propriété pour l'animation du rideau 
     */
    isRideauAnimation = -1;

    /*
     * Propriété pour l'animation du dégradé vers le noir
     */
    isFadeoutAnimation = -1;
    centerPosition = 5;

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

    speed = 3;

    verticalMovesWithoutHit = 0;

    score = -1;

    storage: Storage = null;


    constructor(horizontalIndex: number, 
                containerWidth: number, 
                containerHeight: number,
                faucon: Faucon, 
                storage: Storage) {
      this.horizontalIndex = horizontalIndex;
      
      this.gameWidth = containerWidth;
      this.gameHeight = containerHeight;
      
      this.offsetY = 0;
      this.moduloTile = 0;
      this.currentModuloTile = 0;
      this.faucon = faucon;
      this.score = -1;
      this.storage = storage;
      
      if (window.innerHeight <= 500) {
        this.centerPosition = 4;
      } 
    }


    drawImage(img: any, 
              xPos: number,
              yPos: number,
              width: number,
              height: number) {
      this.context.drawImage(img, xPos, yPos, width, height);
    }

    pause() {
      this.isPaused = !this.isPaused;
      this.isOverlay = this.isPaused;
    }

    hideOverlay() {

      if (this.isOverlay === true) {
        this.score = -1;
      }
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

      this.storage.get('score').then( (val) => {

        if (val === null) {
          this.storage.set('score', this.score);
        } else {
          if (this.score > val) {
            this.storage.set('score', this.score);
          }
        }
      });

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

    restart() {
        this.isRideauAnimation = -1;
        this.isFadeoutAnimation = -1;
        this.isExplosion = -1;
        this.isOverlay = true;
        this.score = -1;
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
        
        oneMoreLine.bind(this),
        
        drawRideau.bind(this),

        buildFadeout.bind(this)

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
