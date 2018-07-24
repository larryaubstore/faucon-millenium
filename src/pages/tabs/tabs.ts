import { Component } from '@angular/core';

import { HomePage }       from '../home/home';
import { Faucon }         from '../../components/faucon/faucon';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Faucon;
  tab2Root = HomePage;

  constructor() {

  }
}
