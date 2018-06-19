import { Component }      from '@angular/core';
import { OnInit }         from '@angular/core';
import { AfterViewInit }  from '@angular/core';
import { NavController }  from 'ionic-angular';

import * as debug         from 'debug';


const log = debug('faucon');

@Component({
  selector: 'faucon',
  templateUrl: 'faucon.html'
})
export class Faucon implements OnInit, AfterViewInit { 

  constructor(public navCtrl: NavController) {
    log('constructor');
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }


}
