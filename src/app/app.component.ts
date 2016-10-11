import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { HomePage }          from '../pages/home/home';
import { AboutPage }         from '../pages/about/about';
import { NewsListComponent } from '../pages/news/news';
import { ContactPage }       from '../pages/contact/contact';

import { Devices }           from '../pages/devices/devices';

@Component({
  //template: `<ion-nav [root]="rootPage"></ion-nav>`
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage = TabsPage;

  @ViewChild(Nav) nav : Nav;
  private rootPage: any;
  private pages: any[];

  constructor(platform: Platform, private menu: MenuController) {
    this.menu = menu;
    this.pages = [
        { title: 'Home',    component: HomePage },
        { title: 'Works',   component: AboutPage },
        { title: 'News',    component: NewsListComponent },
        { title: 'Contact', component: ContactPage },
        { title: 'Devices', component: Devices }
    ];
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.menu.close()
    // Using this.nav.setRoot() causes
    // Tabs to not show!
    this.nav.push(page.component);
    //this.nav.setRoot(page.component);
  };
}