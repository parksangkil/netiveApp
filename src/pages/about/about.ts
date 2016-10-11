import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController }     from 'ionic-angular';

import { WorksService }     from '../../services/works/works';
import { HomeService }      from '../../services/home/home';

import { HomeContentPage }  from '../home/workDetail';

import { Observable }       from 'rxjs/Observable';
import { Works }            from '../../models/works';
import { WorkFile }         from '../../models/workFile';

@Component({
  selector: 'about-home',
  providers: [ WorksService, HomeService ],
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{
  errorMessage: string;
  worksList: Works[];

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
              private worksService: WorksService,
              private homeService: HomeService) {

  }
  
  getWorksList() {
        this.worksService.getWorksList()
                            .subscribe(
                       worksList => this.worksList = worksList,
                       error =>  this.errorMessage = <any>error);
  }

  itemSelected(works:any) {
    alert(works.id);
  }

  openModal(works:any) {
    this.homeService.getWorksPromise(works.id)
                   .then(
                     workFile => {
                                  let modal = this.modalCtrl.create(HomeContentPage, {'workFile': workFile});
                                  modal.present();
                    },
                     error =>  this.errorMessage = <any>error);            
  }

  ngOnInit(): void {
    this.getWorksList();
  }
}
