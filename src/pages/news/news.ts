/// <reference path="../../app/jquery.d.ts" />

import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController }     from 'ionic-angular';
import { NewsListService }   from '../../services/news/news';

//import * as _ from 'underscore';

//웹서버 배포 시 삭제
import { Observable }       from 'rxjs/Observable';
import { News }             from '../../models/news';

@Component({
  selector: 'news-list',
  providers: [ NewsListService ],
  templateUrl: 'news.html',
  /*template: `
    <ul>
      <li *ngFor="let news of newsList">{{news.subject}}</li>
    </ul>
  `, */
  //styleUrls:  ['app/front2016/common/css/common.css', 'app/front2016/common/css/plugins.css']
})
export class NewsListComponent implements OnInit {
    errorMessage: string;
  //newsList: string[] = [];
  wikiList: string[];

  //newsList: Observable<News[]>;
  mode = 'Observable';
  newsList: News[];

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
              private newsListService: NewsListService) { }

  getNewsList() {
        this.newsListService.getNewsList()
                            .subscribe(
                       newsList => this.newsList = newsList,
                       error =>  this.errorMessage = <any>error);

                       /*jQuery(document).ready(function () {
                          console.log( "ready!" );
                       });*/
  }

  ngOnInit(): void {
    this.getNewsList();
  }

  itemSelected(news:any) {
    alert(news.content);
  }

  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }*/

  openModal(news:any) {
    let modal = this.modalCtrl.create(NewsContentPage, {'news': news});
    /*modal.onDidDismiss(data => {
     console.log(data);
    });*/
    modal.present();
  }
}

@Component({
  templateUrl: 'modal-content.html'
})
export class NewsContentPage {
  news: any;

  constructor(
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
    this.news = this.params.get('news');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}