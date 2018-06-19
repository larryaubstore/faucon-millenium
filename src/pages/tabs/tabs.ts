import { Component } from '@angular/core';

import { AboutPage }      from '../about/about';
import { ContactPage }    from '../contact/contact';
import { HomePage }       from '../home/home';
import { Faucon }         from '../../components/faucon/faucon';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Faucon;
  tab3Root = ContactPage;

  constructor() {

  }
}
