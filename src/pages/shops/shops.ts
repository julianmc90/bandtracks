import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiProvider } from './../../providers/api/api';
import { Diagnostic } from '@ionic-native/diagnostic';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';


/**
 * Generated class for the ShopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shops',
  templateUrl: 'shops.html',
})
export class ShopsPage {

  shops: Array<any> = [];
  latitude: any;
  longitude: any;
  
  showErrorResults: boolean = false;
  thereAreResults: boolean = true;


  constructor(public firebaseApp: FirebaseApp, public navCtrl: NavController, public navParams: NavParams, private platform: Platform,private diagnostic: Diagnostic, public apiProvider: ApiProvider,private geolocation: Geolocation, public alertCtrl: AlertController, private file: File) {
 

  }

   ionViewDidEnter(){

      this.getCoordinates(); 

   }


  getCoordinates(){


      this.showErrorResults = false;
      this.thereAreResults = true;
    
      this.platform.ready().then(() => {

      		
   


           // this.diagnostic.isLocationEnabled().then((resultIsEnabled) => {

              // if(resultIsEnabled === true){

                this.geolocation.getCurrentPosition({enableHighAccuracy:true, maximumAge: 3000, timeout: 5000}).then((resp) => {
                    
                  this.latitude = resp.coords.latitude;
                  this.longitude = resp.coords.longitude;
                  // usersKmsRadius

                  this.searchShops();

                }).catch((error) => {
                  
                  //alert(error.message);                            

                   this.showErrorResults = true;

                });
                        
              // }else{

              //   this.showErrorResults = true;
              // }


          
       //    }).catch((error) => {

       //        this.showErrorResults = true;
       // });

  });


    

  }

  placeImages(index = 0){

	if(this.shops[index] != undefined && this.shops[index] != null){
  			

  		this.firebaseApp.storage()
  		.ref()
  		.child('shops_images/'+this.shops[index]['id']+'.jpg')
  		.getDownloadURL().then(url => this.nextIndex(index,url));
 
  	}




  	// /

  }

  nextIndex(index,url){

  	this.shops[index]['pic_url'] = url;

  	this.placeImages(index + 1);

  }


  searchShops(){



          this.apiProvider.searchShops({
	            latitude: this.latitude,
	            longitude: this.longitude,
	          }).then((result) => {

            if(Array.isArray(result)){

                if(result.length == 0){

                  this.thereAreResults = false;
                }else{

                  this.shops = result; 
                  this.placeImages();
                  console.log(this.shops);

                }
            }

          }, (err) => {
              
              alert("no data...");

              console.log(err);
          });


    }




}



