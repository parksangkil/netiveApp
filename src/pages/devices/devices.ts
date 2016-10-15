import { Component }   from '@angular/core';

import { Platform, NavController, Alert } from 'ionic-angular';
import { Plugins }       from '../../services/devices/plugins.service';
import { UploadingPage } from './uploading';
import { Transfer }      from 'ionic-native';

declare var cordova: any;

@Component({
  templateUrl: 'devices.html',
  providers: [ Plugins ]
})
export class Devices {
    images: Array<string> = [];

    constructor(private plugins: Plugins,
                private platform: Platform,
                private nav: NavController) { }

    openAlbums = () : void => {
        this.plugins.albums.open().then((imgUrls) => {            
            imgUrls.forEach((imageUrl: string) : void => {
                if(imageUrl){                  
                  this.images.push(imageUrl);
                }
            }); 
        });        
    }
      
    openCamera = () : void => { 
        this.plugins.camera.open().then((imageUrl) => { 
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