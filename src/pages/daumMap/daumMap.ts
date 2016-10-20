/// <reference path="../../app/jquery.d.ts" />
/// <reference path="../../../typings/requirejs/require.d.ts" />
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var daum;
declare var require;

@Component({
  selector: 'page-contact',
  templateUrl: 'daumMap.html'
})
export class DaumMapPage {

  constructor(public navCtrl: NavController) {

  }
   
  ionViewDidLoad(){
    //this.createMap();
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    /*var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
    };

    var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
    */
        //require(['jquery'], function ($) {
            jQuery(document).ready(() => {
                alert('Your code executes after jQuery has been loaded.');
                 var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                 var options = { //지도를 생성할 때 필요한 기본 옵션
                    center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                    level: 3 //지도의 레벨(확대, 축소 정도)
                };

                var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
            });
        //});
    }
  
  ionViewWillEnter(){
  	//this.reloadMap();
  }
   
}
