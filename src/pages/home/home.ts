import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController}     from 'ionic-angular';
import { HomeService }      from '../../services/home/home';

import { HomeContentPage }  from './workDetail';

import { Observable }       from 'rxjs/Observable';
import { Works }            from '../../models/works';
import { WorkFile }         from '../../models/workFile';

@Component({
  selector: 'page-home',
  providers: [ HomeService ],
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  errorMessage : string;
  worksList    : Works[];
  workFile     : any;
  
  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
              private homeService: HomeService) {
  }
  
  getWorksList() {
        this.homeService.getWorksList()
                            .subscribe(
                       worksList => this.worksList = worksList,
                       error =>  this.errorMessage = <any>error);
  }

  itemSelected(works:any) {
    alert(works.id);
  }

  openModal(works:any) {
    this.homeService.getWorks(works.id)
                            .subscribe(
                       workFile => {
                                     console.log("111 = " + workFile.imgfile);
                                     let modal = this.modalCtrl.create(HomeContentPage, {'workFile': workFile});
                                     modal.present();
                                   },
                       error =>  this.errorMessage = <any>error);
    /*this.homeService.getWorksPromise(works.id)
                   .then(
                     workFile => {//this.workFile = workFile;
                                  console.log("111 = " + workFile.imgfile);
                                  let modal = this.modalCtrl.create(HomeContentPage, {'workFile': workFile});
                                  modal.present();
                    },
                     error =>  this.errorMessage = <any>error); */               
  }

  ngOnInit(): void {
    this.getWorksList();
  }
}