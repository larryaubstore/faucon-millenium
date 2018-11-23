import { Component }          from '@angular/core';
import { OnInit }             from '@angular/core';
import { AfterViewInit }      from '@angular/core';
import { NavController }      from 'ionic-angular';
import { Events }             from 'ionic-angular';

import * as debug             from 'debug';
import { TileEngine }         from './tileEngine';
import { ScreenOrientation }  from '@ionic-native/screen-orientation';
import { Platform }           from 'ionic-angular';
import { Storage }            from '@ionic/storage';

const log = debug('faucon');

@Component({
  selector: 'faucon',
  templateUrl: 'faucon.html'
})
export class Faucon implements OnInit, AfterViewInit { 

  tileEngine: TileEngine = null;
  score: number = 0;

  constructor(public navCtrl: NavController, 
              events: Events, 
              private screenOrientation: ScreenOrientation, 
              public plt: Platform,
              private storage: Storage) {
    log('constructor');
    this.subscribeEvents(events);
    this.score = 0;
  }

  subscribeEvents(events: Events) {
    events.subscribe('game-channel', (message) => {
      switch(message) {
        case 'pause':
          this.pause();
          break;
        case 'explosion':
          this.explosion();
          break;
      }
    });
  }

  ngOnInit() {
    if (!this.plt.is('core') && !this.plt.is('mobileweb')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  isPaused() {
    if (this.tileEngine !== null) {
      return this.tileEngine.isPaused();
    } else {
      return false;
    }
  }

  
  isOverlay() {
    if (this.tileEngine !== null) {
      return this.tileEngine.isOverlay();
    } else {
      return false;
    }
  }

  isInitialMode() {
    if (this.tileEngine !== null) {
      return this.tileEngine.isInitialMode();
    } else {
      return true;
    }
  }

  pause() {
    this.tileEngine.pause();
  }

  explosion() {
    this.tileEngine.explosion();
  }

  hideOverlay() {
    this.tileEngine.hideOverlay();
  }

  ngAfterViewInit() {
    log('ngAfterViewInit');

    let windowWidth: number = window.innerWidth;        // 1080
    let windowHeight: number = window.innerHeight;      // 1920

    var canvas: any = document.getElementById('viewport');

    if (windowWidth >= 540) {
      canvas.width  = 540;
      canvas.height = 1920;
    } else {
      canvas.width  = windowWidth;
      canvas.height = windowHeight;
    }

    log('width ==> ' + windowWidth);
    log('height => ' + windowHeight);

    this.tileEngine = new TileEngine(windowWidth, windowHeight, this, this.storage);
    this.tileEngine.render();
  }
}
