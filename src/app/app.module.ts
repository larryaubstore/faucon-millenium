import { NgModule, ErrorHandler }                     from '@angular/core';
import { BrowserModule }                              from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler }   from 'ionic-angular';
import { MyApp }                                      from './app.component';

import { AboutPage }                                  from '../pages/about/about';
import { ContactPage }                                from '../pages/contact/contact';
import { HomePage }                                   from '../pages/home/home';
import { TabsPage }                                   from '../pages/tabs/tabs';

import { Faucon }                                     from '../components/faucon/faucon';

import { StatusBar }                                  from '@ionic-native/status-bar';
import { SplashScreen }                               from '@ionic-native/splash-screen';
import { ScreenOrientation }                          from '@ionic-native/screen-orientation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Faucon
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Faucon
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
