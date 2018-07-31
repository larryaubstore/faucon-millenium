import { Component }      from '@angular/core';
import { OnInit }         from '@angular/core';
import { AfterViewInit }  from '@angular/core';
// import { ionViewCanLeave }  from '@angular/core';
import { NavController }  from 'ionic-angular';
import { Events }         from 'ionic-angular';

import * as debug         from 'debug';
import { TileEngine }     from './tileEngine';



const log = debug('faucon');

@Component({
  selector: 'faucon',
  templateUrl: 'faucon.html'
})
export class Faucon implements OnInit, AfterViewInit { 

  tileEngine: TileEngine = null;

  constructor(public navCtrl: NavController, events: Events) {
    log('constructor');
    this.subscribeEvents(events);
  }

  subscribeEvents(events: Events) {
    events.subscribe('game-channel', (message) => {
      if (message === 'pause') {
        this.pause();
      }
    });
  }

  ngOnInit() {

  }

  pause() {
    this.tileEngine.pause();
  }

  ngAfterViewInit() {
    log('ngAfterViewInit');

    let windowWidth: number = window.innerWidth;        // 1080
    let windowHeight: number = window.innerHeight - 78; // 1920

    var canvas: any = document.getElementById('viewport');

    if (windowWidth >= 540) {
      canvas.width  = 540;
      canvas.height = 1920;
    } else {
      canvas.width  = windowWidth;
      canvas.height = windowHeight;
    }

    //412 / 669 + 78

    log('width ==> ' + windowWidth);
    log('height => ' + windowHeight);

    this.tileEngine = new TileEngine(windowWidth, windowHeight);
    this.tileEngine.render();
  }
}
