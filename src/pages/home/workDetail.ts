import { Component }                  from '@angular/core';
import { NavParams, ViewController }  from 'ionic-angular';
import { WorkFile }                   from '../../models/workFile';

@Component({
  //templateUrl: 'modal-content.html'
  template:`
    <ion-header>
        <ion-toolbar>
        <ion-title>{{title}}</ion-title>
        <ion-buttons end>
            <button outline  (click)="dismiss()">
            닫기 
            </button>
        </ion-buttons>
        </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
            <img *ngFor="let file of workFile" src="http://www.netive.co.kr/netiveadmin/data/file/portfolio/{{file.imgfile}}"/>
      </ion-card>
    </ion-content>
  `
})
export class HomeContentPage {
  workFile: WorkFile;
  title = '상세 보기';

  constructor(
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
    this.workFile = this.params.get('workFile');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}