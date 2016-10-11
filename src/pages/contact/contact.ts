import {Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.createMap();
  }
  
  ionViewWillEnter(){
  	this.reloadMap();
  }
  
  reloadMap(){
  	google.maps.event.trigger(this.map,'resize');
  }
 
  createMap(){
 
    let latLng = new google.maps.LatLng(37.555349, 126.918934);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }
}
