import * as debug					from 'debug';
import { TileType }       from './tileType';
const log = debug('game');

export class Tile {


  tileType: TileType;

  /*
   * Indice de l'animation
   */
  indexAnimation: number;

  /*
   * Image pour le 'context'
   */
  imagePtr: any;
  xPos: number;
  yPos: number;
  width: number;
  height: number;

  /*
   * Position initiale de l'axe Y
   */
  initialYPos: number;

  /*
   * 'collision' ou 'nocollision'
   */
  collision: any;


  /*
   * Grille [rangée-colonne] 
   * pour obtenir l'état
   * de la grille en temps réel
   */
  liveMap: any;

  /*
   * Décalage en Y
   */
  offsetY: number;

  constructor(imagePtr: any, 
              xPos: number, 
              yPos: number, 
              width: number, 
              height: number,
              collision: any, 
              liveMap: any,
              tileType: TileType) {
    this.imagePtr = imagePtr;
    this.xPos = xPos;
    this.yPos = yPos;
    this.initialYPos = yPos;
    this.width = width;
    this.height = height;
    this.collision = collision;
    this.liveMap = liveMap;
    this.indexAnimation = -1;
    this.tileType = tileType;
  }

  setYPos(yPos: number) {
    this.yPos = yPos;
    let index: string =  this.xPos + '-' + (this.yPos + 1);
    this.liveMap[index] = this;
  }

  setOffsetY(offsetY: number) {
    this.offsetY = offsetY;
  }

  getCalcYPos() {
    return this.height * this.yPos + this.offsetY;
  }
}
