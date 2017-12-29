import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from './../../providers/api/api';

import { ProfilePage } from '../profile/profile';
import { LoadingController } from 'ionic-angular';
import { StorageProvider } from './../../providers/storage/storage';

/**
 * Generated class for the EditAbilitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-abilities',
  templateUrl: 'edit-abilities.html',
})
export class EditAbilitiesPage {
	
	abilities: any; 
	user: any;
	

  constructor(public storageProvider : StorageProvider, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,private storage: Storage, public apiProvider: ApiProvider) {
  

  }

  ionViewDidLoad() {

      this.storageProvider.get("userInfo").then((val) => {

            this.user = val;  
  
            this.abilities = val['users_abilities'];

      }, (err) => {

    });

  }


  saveAbilities(){


  	let loading = this.loadingCtrl.create({
    	content: 'Guardando...'
  	});

  	loading.present();

          this.storageProvider.get("userInfo").then((val) => {


            val['users_abilities'] = this.abilities;
          
            this.storageProvider.set("userInfo",val).then(() => {

            this.apiProvider.saveAbilities({abilities:this.abilities,app_identifier:this.user.app_identifier}).then((result) => {

                   loading.dismiss();
                  this.navCtrl.pop();       

                }, (err) => {
                  
                      loading.dismiss();
                      alert("An error has occured");

                      console.log(err);
                });


               }, (err) => {
                  // alert(JSON.stringify(err));

              });


          }, (err) => {

        });


  }

}
