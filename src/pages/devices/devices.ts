import { Component }   from '@angular/core';

import { NavController } from 'ionic-angular';
import { Plugins }       from '../../services/devices/plugins.service';
import { UploadingPage } from './uploading';

@Component({
  templateUrl: 'devices.html',
  providers: [ Plugins ]
})
export class Devices {
    images: Array<string> = [];

    constructor(private plugins: Plugins,
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
    
    startUploading = () : void => {
      this.nav.setRoot(UploadingPage, {
          images: this.images
      });    
    }
 }