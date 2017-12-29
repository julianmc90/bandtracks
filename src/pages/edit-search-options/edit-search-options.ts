import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MusiciansPage } from '../musicians/musicians';
import { ApiProvider } from './../../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { StorageProvider } from './../../providers/storage/storage';


/**
 * Generated class for the EditSearchOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-search-options',
  templateUrl: 'edit-search-options.html',
})
export class EditSearchOptionsPage {

  distance: any;
  searchByAbilities: boolean;
  abilities: any;
  user: any;

  constructor(public storageProvider : StorageProvider, public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public apiProvider: ApiProvider) {
  	


  }


   ionViewDidEnter(){

    this.loadValues();

 }

 loadValues(){

  this.storageProvider.get("userInfo").then((val) => {

      this.user = val;  
      this.distance =  val['users_kms_search'];
      this.searchByAbilities =  val['search_by_abilities'] == 1 ? true : false; 
      this.abilities = val['users_abilities_pref'];

      }, (err) => {

    });

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSearchOptionsPage');
  }

  saveSearchOptions(){
   	


	let loading = this.loadingCtrl.create({
	    	content: 'Guardando...'
	  	});

  	loading.present();

      this.storageProvider.get("userInfo").then((val) => {
    	
     	    val['users_abilities_pref'] = this.abilities;
	       	val['users_kms_search'] = this.distance;
			    val['search_by_abilities'] = this.searchByAbilities;

     	   this.storageProvider.set("userInfo",val).then(() => {

            this.apiProvider.updateUserInfo(
      				{
      			   	app_identifier: this.user.app_identifier,
      					userKmsSearch: this.distance, 
      					searchByAbilities:  this.searchByAbilities,
      					abilities: this.abilities
      				}
            ).then((result) => {

                // setTimeout(() => {

      			      loading.dismiss();
    				      this.navCtrl.setRoot(MusiciansPage);    		
    			 
    			      // }, 1000);

            }, (err) => {
              
              loading.dismiss();

              alert("error");
              console.log(err);
            
            });
		

               }, (err) => {
                  // alert(JSON.stringify(err));

              });


          }, (err) => {

        });



  }

}
