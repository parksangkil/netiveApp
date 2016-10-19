import { Component }   from '@angular/core';

import { Platform, NavController, Alert } from 'ionic-angular';
import { Plugins }       from '../../services/devices/plugins.service';
import { UploadingPage } from './uploading';
import { Transfer }      from 'ionic-native';

import { __platform_browser_private__, 
         SafeResourceUrl, 
         DomSanitizer } from '@angular/platform-browser';

declare var cordova: any;

@Component({
  templateUrl: 'devices.html',
  providers: [ Plugins, __platform_browser_private__.BROWSER_SANITIZATION_PROVIDERS ]
})
export class Devices {
    images: Array<string> = [];
    cameraData: string;
    photoTaken: boolean;

    constructor(private plugins: Plugins,
                private platform: Platform,
                private nav: NavController,
                private _DomSanitizationService: DomSanitizer) { }

    openAlbums = () : void => {
        this.plugins.albums.open().then((imgUrls) => {            
            imgUrls.forEach((imageUrl: string) : void => {
                if(imageUrl){                  
                  this.images.push(imageUrl);
                }
            }); 
        });        
    }

    openOcrAlbums = () : void => {
        this.plugins.albums.open().then((imgUrl) => { 

            this.getImageBase64String(imgUrl[0]).then(
                    (image: string) => {
                        //alert("getImageBase64String : " + image.substring(23, image.length));
                        this.photoTaken = true;
                        this.cameraData = image;
                        this.images.push(image.substring(23, image.length));     
                    }
                ).catch((error: any) => {
                    alert(error);
                }); ; 

            /*this.getFileContentAsBase64(imgUrl[0],function(base64Image){
                 alert("getFileContentAsBase64 : " + base64Image.substring(0, 100));
                this.photoTaken = true;
                this.cameraData = base64Image;
                this.images.push(base64Image);    
            });*/

            /*this.getFileContentAsBase64Promise(imgUrl[0]).then(
                    (image: string) => {
                        alert("getFileContentAsBase64Promise : " + image.substring(0, 100));
                        this.photoTaken = true;
                        this.cameraData = image;
                        this.images.push(image);     
                    }
                ).catch((error: any) => {
                    alert(error);
                }); ; */

            /*if(imgData) {
                this.images.push(imgData);            
            }*/

        });   
    }

   getFileContentAsBase64(path,callback){
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

   getFileContentAsBase64Promise(path: string){
        return new Promise( (resolve, reject) => {
            window.resolveLocalFileSystemURL(path, gotFile, fail);
                    
            function fail(e) {
                alert('Cannot found requested file');
            }

            function gotFile(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function(e) {
                        var content = this.result;
                        resolve(content);
                    };
                    // The most important point, use the readAsDatURL Method from the file plugin
                    reader.readAsDataURL(file);
                });
            }
        });
    }

    getImageBase64String(url: string) {
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

    openCamera = (type:number) : void => { 
        this.plugins.camera.open(type).then((imageUrl) => { 
            this.cameraData = 'data:image/jpeg;base64,' + imageUrl;
            this.photoTaken = true;
          if(imageUrl) {
            this.images.push(imageUrl);            
          }
      });
    }
    
    openFile = () : void => { 
        this.plugins.file.open();
    }

    startUploading = () : void => {

        //alert("startUploading");
      /*this.nav.setRoot(UploadingPage, {
          images: this.images
      });*/    

      this.nav.push(UploadingPage, {
           images: this.images
      });
    }

    downloadImage(image) {
        this.platform.ready().then(() => {
        const fileTransfer = new Transfer();
        const imageLocation = `${cordova.file.applicationDirectory}www/${image}`;

        let targetPath; // storage location depends on device type.

        // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
        if(!this.platform.is('cordova')) {
            return false;
        }

        if (this.platform.is('ios')) {
            targetPath = cordova.file.documentsDirectory + image;
        }
        else if(this.platform.is('android')) {
            targetPath = cordova.file.dataDirectory + image;
        }
        else {
            // do nothing, but you could add further types here e.g. windows/blackberry
            return false;
        }

        fileTransfer.download(imageLocation, targetPath)
            .then( (data) => {
                const alertSuccess = Alert.create({
                title: 'Download Succeeded!',
                subTitle: `${image} was successfully downloaded to: ${targetPath}`,
                buttons: ['Ok']
                });

                this.nav.push(alertSuccess);
            },
            (err) => {

                const alertFailure = Alert.create({
                title: 'Download Failed!',
                subTitle: `${image} was not successfully downloaded, please try again later`,
                buttons: ['Ok']
                });

                this.nav.push(alertFailure);
            } );
         });
      }

}