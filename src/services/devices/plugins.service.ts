import { Injectable } from "@angular/core";
import { Camera, ImagePicker, File } from 'ionic-native';
//import * as _ from 'underscore';

declare var cordova: any;

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