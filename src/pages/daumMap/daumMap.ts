//// <reference path="../../app/jquery.d.ts" />
//// <reference path="../../../typings/requirejs/require.d.ts" />
import { Component, ViewChild, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Printer, PrintOptions, Screenshot } from 'ionic-native';

declare var daum;
declare var $;
declare var cordova;
declare var navigator;

//declare var require;

@Component({
  selector: 'page-contact',
  templateUrl: 'daumMap.html'
})
export class DaumMapPage implements AfterViewInit{
    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(public navCtrl: NavController, private renderer: Renderer, private alertCtrl: AlertController) {

    }
    
    ionViewDidLoad(){
        //this.createMap();

        /*Printer.isAvailable().then(onSuccess, onError);
        let options: PrintOptions = {
            name: 'MyDocument',
            printerId: 'printer007',
            duplex: true,
            landscape: true,
            grayscale: true
        };
        Printer.print(content, options).then(onSuccess, onError);*/

        /*let fileContent:string = [
                        '<div style="width:100%; height: 100%; border: 1px solid red;">',
                        '   <img style="height: 90%;" src="http://www.netive.co.kr/front2016/img/netive.jpg" />',
                        '</div>'
                    ].join('');

        cordova.plugins.printer.print(fileContent, {
                        name:'capture.html',
                        landscape: true
                    });*/
       
        /*$(document).ready(() => {
        alert('Your code executes after jQuery has been loaded.');
        });*/

    }

    ngAfterViewInit() {
       //this.renderer.invokeElementMethod(this.mapElement.nativeElement, 'focus');
       this.createMap();
       this.printScreenShot();
    }

    createMap(){
        //var el: HTMLElement = document.getElementById('map');

        //let latLng = new daum.maps.LatLng(33.450701, 126.570667);
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new daum.maps.LatLng(37.56710, 126.98040), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        this.map = new daum.maps.Map(this.mapElement.nativeElement, options);
        
        // 지도 타입 변경 컨트롤을 생성한다
		var mapTypeControl = new daum.maps.MapTypeControl();

		// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
		this.map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);	

		// 지도에 확대 축소 컨트롤을 생성한다
		var zoomControl = new daum.maps.ZoomControl();

		// 지도의 우측에 확대 축소 컨트롤을 추가한다
		this.map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

        /*daum.maps.event.addListener(this.map, 'center_changed', function () {
            let alert = this.alertCtrl.create({
                        title: '중심 좌표',
                        subTitle: 'map',
                        message: '지도의 중심 좌표는 ' + this.map.getCenter().toString() +' 입니다.',
                        buttons: ['OK']
            });
            alert.present();
		});

        // 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
		daum.maps.event.addListener(this.map, 'click', function (mouseEvent) {
			let alert = this.alertCtrl.create({
                        title: '중심 좌표',
                        subTitle: 'map',
                        message: '지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.',
                        buttons: ['OK']
            });
            alert.present();
		});*/

        // 지도에 마커를 생성하고 표시한다
		var marker = new daum.maps.Marker({
		    position: new daum.maps.LatLng(37.56710, 126.98040), // 마커의 좌표
		    map: this.map // 마커를 표시할 지도 객체
		}); 		  
    }

    ionViewWillEnter(){
        //this.reloadMap();
    }

    reloadMap(){
        daum.maps.event.trigger(this.map,'resize');
    }

    printScreenShot() {
        // Capture image using cordova screenshot plugin
        navigator.screenshot.save(
            function(error,res) {
                if(error) {
                    // Show error
                    let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Screenshot',
                        message: 'Some error occurred while trying to make screenshot',
                        buttons: ['OK']
                    });
                    alert.present();
                } else {
                    // Define HTML content
                    let fileContent:string = [
                        '<div style="width:100%; height: 100%; border: 1px solid red;">',
                        '   <img style="height: 90%;" src="'+res.filePath+'" />',
                        '</div>'
                    ].join('');

                    // FIXME: Print captured image
                    cordova.plugins.printer.print(fileContent, {
                        name:'map.html',
                        landscape: true
                    });
                }
            },
            'jpg', // screenshot format
            95     // screenshot quality
        );
    }
}
