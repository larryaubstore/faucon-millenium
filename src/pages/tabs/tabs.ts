import { Component }      from '@angular/core';
import { ViewChild }      from '@angular/core';
import { Tabs }           from 'ionic-angular';
import { NavController }  from 'ionic-angular';
import { Events }         from 'ionic-angular';

// import { Tab }      from 'ionic-angular';
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

  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, private events: Events) {

  }

  settingButton() {
    log('settingButton');
    debugger;
    //(this.tab1Root as any).pause();
    this.events.publish('game-channel', 'pause');

  }

  playButton() {
    log('playButton');

    // let tabSelected = this.tabRef.getSelected();
    // debugger;
    //this.tabRef.selectedIndex = 1;
  }
}
