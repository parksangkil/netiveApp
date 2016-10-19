/// <reference path="../../../typings/cordova/cordova.d.ts" />
import { Injectable } from "@angular/core";
import { Camera, ImagePicker, File } from 'ionic-native';

//import * as _ from 'underscore';

declare var cordova: any;
declare var window : Window;

@Injectable()
export class Plugins {
    
    constructor() { 
    }     
    
    albums = {            
        open () : Promise<any>  { 
            return ImagePicker.getPictures({
                    quality: 100,                        
                    maximumImagesCount: 15,
            }).then((imgUrls) => {
                return imgUrls;
            }, (err) => {                                   
                if(err.error == "cordova_not_available") {               
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");                                   
                } else {                
                    console.log("Failed to open albums: " + err.error);
                }
            });
        },         
    }
    
    albumsOcr = {            
        open () : Promise<any>  { 
            return ImagePicker.getPictures({
                    quality: 100,                        
                    maximumImagesCount: 15,
            }).then((imgUrls) => {
                //alert("imgUrls : " + imgUrls);
                /*cordova.Base64.encodeFile(imgUrls, function(base64){
                    alert("base64 : " + base64);
                    return base64;
                });*/

                /*cordova.Base64.encodeFile.then((base64) => {            
                     alert("base64 : " + base64);
                    return base64;
                });*/  

                /*window.plugins.Base64.encodeFile(imgUrls, function(base64){
                    alert("base64 : " + base64);
                    //console.log('file base64 encoding: ' + base64);
                    return base64;
                });*/
                
                /*this.getImageBase64String(imgUrls).then(
                    (image: string) => {
                        alert("getImageBase64String : " + image);
                    }
                );*/

                //this.testAlert(imgUrls);
                /*this.getFileContentAsBase64(imgUrls, function(base64Image){
                  alert(base64Image); 
                });*/

                return imgUrls;
            }, (err) => {                                   
                if(err.error == "cordova_not_available") {               
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");                                   
                } else {                
                    console.log("Failed to open albums: " + err.error);
                }
            });
        },         
    }

    getFileContentAsBase64(path,callback){ //여기 있으면 호출이 안됨. 
        window.resolveLocalFileSystemURL(path, gotFile, fail);
                
        function fail(e) {
            alert('Cannot found requested file');
        }

        function gotFile(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    var content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    }

    getImageBase64String(url: string) { //여기 있으면 호출이 안됨. 
        return new Promise( (resolve, reject) => {

            // Convert image to base64 string
            //var canvas: HTMLCanvasElement = document.createElement('CANVAS'),
            //var canvas = <HTMLCanvasElement> document.getElementById("mycanvas");
            var canvas : any = document.createElement('CANVAS');
            //var canvas: HTMLCanvasElement = $(element).find('canvas').get(0);

            var ctx = canvas.getContext('2d'), img = new Image;

            img.crossOrigin = 'Anonymous';

            img.onload = () => {
                var dataURL: any = null;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);

                // set image quality
                dataURL = canvas.toDataURL('image/jpeg', 0.9);
                canvas = null;
                resolve(dataURL);
            };

            img.onerror = (err) => {
                reject(err);
            };

            img.src = url;
        });

    }

    camera = {       
        open (type:number) : Promise<any>  {
            let options = {
                destinationType: type, //0 : Return image as base64-encoded string, 1 : Return image file URI
                sourceType: 1,
                encodingType: 0,
                quality:100,
                allowEdit: false,
                saveToPhotoAlbum: true,            
                correctOrientation: true,
            };        
            return Camera.getPicture(options).then((imageData) => {
                //let base64Image = 'data:image/jpeg;base64,' + imgUrl;
                return imageData;
            }, (err) => {                
                if(err.error == "cordova_not_available") {
                    alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");            
                } else {
                    console.log("Failed to open camera: " + err.error);                
                }    
            });
        } 
    }  

    file = {
        open() : void {
            File.listDir(cordova.file.applicationDirectory, 'mySubFolder/mySubSubFolder').then(
                (files) => {
                    // do something
                }
                ).catch(
                (err) => {
                    // do something
                }
            );
        }
    }
}