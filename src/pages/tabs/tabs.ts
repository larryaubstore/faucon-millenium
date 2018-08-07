import { Component }      from '@angular/core';
import { NavController }  from 'ionic-angular';
import { Events }         from 'ionic-angular';

import { HomePage }       from '../home/home';
import { Faucon }         from '../../components/faucon/faucon';

import * as debug         from 'debug';

const log = debug('tabs');

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Faucon;
  tab2Root = HomePage;


  constructor(public navCtrl: NavController, private events: Events) {

  }

  settingButton() {
    log('settingButton');
    this.events.publish('game-channel', 'pause');
  }

  explosionButton() {
    log('explosionButton');
    this.events.publish('game-channel', 'explosion');
  }

  playButton() {
    log('playButton');
  }
}
