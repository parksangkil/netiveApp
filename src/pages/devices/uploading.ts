//npm install --save @types/lodash
//tsd install underscore --save
//typings search lodash
//typings install lodash --save
//http://hack.limbicmedia.ca/using-lodash-and-underscorejs-with-ionic-2-rc0/
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Transfer, File }  from 'ionic-native';
import { Plugins }   from '../../services/devices/plugins.service';
import _             from 'lodash'
import { NgZone }    from '@angular/core';
import { Devices }   from './devices';

//declare var _: UnderscoreStatic;
declare var cordova: any;
//onst fs:string = cordova.file.dataDirectory;
declare var window;

@Component({
  templateUrl: 'uploading.html',
  providers: [ Plugins ]
})
export class UploadingPage implements OnInit{
    
    images: Array<string>
    
    uploading: boolean = true;
    current: number = 1;
    total: number;
    progress: number;
    
    ngOnInit() {
      console.log('lodash version:', _.VERSION);
    }
    
    constructor(private nav: NavController, 
                private navParams: NavParams,
                private plugins: Plugins,
                private ngZone: NgZone,
                public alertCtrl: AlertController) {  
                    
        this.images = this.navParams.get("images");        
        if(!this.images || this.images.length == 0) {
            let alert = alertCtrl.create({
                title: "Error",
                subTitle: "No images found to upload",
                buttons: ['Ok']
            });
            //nav.present(alert);
            alert.present();
            return;
        }      
        
        this.total = this.images.length; 
        this.upload(this.images[0]);       
    }
    
    done = () : void => {
        //this.nav.setRoot(Devices);   
        this.nav.push(Devices); 
    }
    
    success = (result: any) : void => { 
        if(this.current < this.total) {             
            this.current++;
            this.progress = 0;                    
            this.upload(this.images[this.current - 1]);
        } else {   
            this.uploading = false;
            let alert = this.alertCtrl.create({
                title: "파일 전송 완료",
                subTitle: "파일 전송이 완료되었습니다.",
                buttons: ['Ok']
            });
            //nav.present(alert);
            alert.present();
            this.done();
        }
    }
            
    failed = (err: any) : void => {
        let code = err.code;
        alert("Failed to upload image. Code: " + code);
    }
    
    onProgress =  (progressEvent: ProgressEvent) : void => {
        this.ngZone.run(() => {
            if (progressEvent.lengthComputable) {
                let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                //console.log(progress);
                this.progress = progress      
            }
        });
    }
    
    upload = (image: string) : void => { 
        //alert("upload image name :" + image);
        let ft = new Transfer();
        let filename = _.uniqueId() + ".jpg";

        //alert("filename : " + filename);

        let options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type' : undefined
            },
            params: {
                fileName: filename
            }
        }; 
        //ft.onProgress(this.onProgress);
        /*ft.upload(image, "http://www.netive.co.kr/api/upload.php", options, false)
        .then((result: any) => {
            this.success(result);
        }).catch((error: any) => {
            this.failed(error);
        });*/

        //Google Cloud Vision Api Call Start
        var api_key = 'AIzaSyDn3jzL8PQMdoHAJmr0KFTRacwG2smF_0A';
        /*let me = {
                current_image: image,
                image_description: '',
                detection_type: 'TEXT_DETECTION',
                detection_types:{
                    LABEL_DETECTION: 'label',
                    TEXT_DETECTION: 'text',
                    LOGO_DETECTION: 'logo',
                    LANDMARK_DETECTION: 'landmark'
                },
                allowEdit: false,
                saveToPhotoAlbum: true,            
                correctOrientation: true,
            }; */ 

        //me.current_image = "data:image/jpeg;base64," + image;
        //me.image_description = '';

        var vision_api_json = {
                  "requests":[
                    {
                      "image":{
                        "content": image
                      },
                      "features":[
                        {
                          "type": "TEXT_DETECTION",
                          "maxResults": 1
                        }
                      ]
                    }
                  ]
                };
        var file_contents = JSON.stringify(vision_api_json);
        //alert("file_contents : " + file_contents);

        //File.checkDir(cordova.file.documentsDirectory, 'NoCloud').then(_ => alert('checkDir Success')).catch(err => alert('checkDir Failed'));

        File.createFile(cordova.file.documentsDirectory, 'file.json', true ).then(function(result) {
            // Success!
            //alert('file created.');
            //alert(JSON.stringify(result));
        }, function(err) {
            // An error occured. Show a message to the user
            //alert('file writed');
            alert(JSON.stringify(err));
        });

        File.writeFile(
                    cordova.file.documentsDirectory,
                    'file.json',
                    file_contents,
                    true
                ).then(function(result){
                    
                    var headers = {
                        'Content-Type': 'application/json'
                    };
                    options.headers = headers;

                    var server = 'https://vision.googleapis.com/v1/images:annotate?key=' + api_key;
                    var filePath = cordova.file.documentsDirectory + 'file.json';

//alert('file writed => ' + filePath);

                    ft.upload(filePath, server, options, true)
                        .then(function(result){

                            var res = JSON.parse(result.response);
                            //var key = me.detection_types[me.detection_type] + 'Annotations';
                            
                            var key =  'textAnnotations';

                            //me.image_description = res.responses[0][key][0].description;
                            alert("image_description : " + res.responses[0][key][0].description);
                      }, function(err){
                        //alert('An error occurred while uploading the file');
                         alert('Google Cloud Vision API Call Error : ' );
                      });
                }, function(err){
                    alert('파일 쓰기 오류 발생 : ' + (<Error>err).message);
                    //alert(' Vision API 파일 전송 오류 발생 ');
                });
        //Google Cloud Vision Api Call End

    }
}