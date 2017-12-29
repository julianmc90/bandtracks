import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { EditAbilitiesPage } from '../edit-abilities/edit-abilities';
import { NetworksPage } from '../networks/networks';
import { LikedArtistsPage } from '../liked-artists/liked-artists';
import { LikedMusicalGendersPage } from '../liked-musical-genders/liked-musical-genders';

import { Clipboard } from '@ionic-native/clipboard';
import { StorageProvider } from './../../providers/storage/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any;
  socialNetworks: any;
  abilities: any;
  artistsSelected: Array<any> = [];
  gendersSelected: Array<any> = [];
 
  constructor(public storageProvider : StorageProvider, public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth, private alertCtrl: AlertController, private clipboard: Clipboard) {

	afAuth.authState.subscribe(user => {

      if (user) {

      		this.user = user;

      }

    });


	this.socialNetworks = [

		{
			id:'id_web',
			name:'Web',
			value:null,
			img:'assets/imgs/ic_web_jl.png',
		},

		{
			id:'id_whatsapp',
			name:'Whatsapp',
			value:null,
			img:'assets/imgs/ic_whatsapp_jl.png',
		},

		{
			id:'id_instagram',
			name:'Instagram',
			value:null,
			img:'assets/imgs/ic_instagram_jl.png',
		},

		{
			id:'id_facebook',
			name:'Facebook',
			value:null,
			img:'assets/imgs/ic_facebook_jl.png',
		},

		{
			id:'id_youtube',
			name:'Youtube',
			value:null,
			img:'assets/imgs/ic_youtube_jl.png',
		},

		{
			id:'id_twitter',
			name:'Twitter',
			value:null,
			img:'assets/imgs/ic_twitter_jl.png',
		},
	];


  }


 ionViewDidEnter(){

 		this.loadValues();

 }

  loadValues(){

	this.storageProvider.get("userInfo").then((result) => {

      	this.artistsSelected = result['artists'];

	  	this.abilities = result['users_abilities'];
	        
        this.gendersSelected = result['genders'];

	        for(var i = 0; i < this.socialNetworks.length; i++){

	        	this.socialNetworks[i].value = null;
	        	
	        	if(result[''+this.socialNetworks[i].id] != null && result[''+this.socialNetworks[i].id] != ''){

	        		this.socialNetworks[i].value = result[''+this.socialNetworks[i].id];
	        	}
	        }	


	     }, (err) => {
	     	console.log(err);
	    });


  }

  goToNetworks(){
    this.navCtrl.push(NetworksPage); 
  }


  openViewSocial(socialNetwork){

	  let myAlert = this.alertCtrl.create({
	    title: socialNetwork.name,
		subTitle: socialNetwork.value,
    	buttons: [
	      {
	        text: 'Copiar',
	        handler: data => {

				this.clipboard.copy(socialNetwork.value).then((result) => {

					alert("Copiado al portapapeles");

		        }, (err) => {

					alert("no copio");
		        });

	        
	        }
	      },
		      {
	        text: 'OK',
	        role: 'cancel',
	        handler: data => {
	            return true;
	        }
	      },

	    ]
	  });
	  myAlert.present();
  }




  	openEditAbilities(){
		
	    this.navCtrl.push(EditAbilitiesPage);  		
  	}


  	openLikedArtistPage(){
		
	    this.navCtrl.push(LikedArtistsPage);  		
  	}


  	openLikedGendersPage(){
	    this.navCtrl.push(LikedMusicalGendersPage);  		
  		
  	}

  ionViewDidLoad() {
		

  }

}
