import { Game }       from './game';
import { Faucon }     from './faucon';
import { Storage }    from '@ionic/storage';

import * as debug     from 'debug';
import * as rafLoop   from 'raf-loop';


const log = debug('eventLoop');

export class EventLoop {

  game: Game = null;
  originalHorizontalIndex: number = 0;
  touchStartPos: number = 0;



  constructor(containerWidth: number, containerHeight: number, faucon: Faucon, storage: Storage) {
    log('eventLoop');
    this.game = new Game(2, containerWidth, containerHeight, faucon, storage);
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
    this.game.hideOverlay();
    log(evt.changedTouches[0].pageX);
    this.originalHorizontalIndex = this.game.horizontalIndex;
    this.touchStartPos = evt.changedTouches[0].pageX;

  }

  touchMove(evt: any) {
    log('touchMove');
    log(evt.changedTouches[0].pageX);

     let delta: number = (this.touchStartPos - evt.changedTouches[0].pageX) / (window.innerWidth / 5);
     this.game.moveHorizontally(this.originalHorizontalIndex - delta);
  }

  checkKey(e: any) {
    e = e || window.event;
    this.game.hideOverlay();
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
