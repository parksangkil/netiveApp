import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { HomeContentPage } from '../pages/home/workDetail';
import { NewsListComponent, NewsContentPage } from '../pages/news/news';
import { TabsPage } from '../pages/tabs/tabs';

import { Devices } from '../pages/devices/devices';
import { UploadingPage }     from '../pages/devices/uploading';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomeContentPage,
    NewsListComponent,
    NewsContentPage,
    TabsPage,
    Devices,
    UploadingPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomeContentPage,
    NewsListComponent,
    NewsContentPage,
    TabsPage,
    Devices,
    UploadingPage
  ],
  providers: []
})
export class AppModule {}
