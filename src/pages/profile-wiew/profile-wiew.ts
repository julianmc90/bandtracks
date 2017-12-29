import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the ProfileWiewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-wiew',
  templateUrl: 'profile-wiew.html',
})
export class ProfileWiewPage {

  userToImage: string = '';
  userToName: string = '';

  abilities: any;
  socialNetworks:any;
  options: any;
  artistsSelected: Array<any> = [];
  gendersSelected: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private clipboard: Clipboard, private alertCtrl: AlertController, private iab: InAppBrowser) {


	this.options = {
	    location : 'yes',//Or 'no' 
	    hidden : 'no', //Or  'yes'
	    clearcache : 'yes',
	    clearsessioncache : 'yes',
	    zoom : 'yes',//Android only ,shows browser zoom controls 
	    hardwareback : 'yes',
	    mediaPlaybackRequiresUserAction : 'no',
	    shouldPauseOnSuspend : 'no', //Android only 
	    closebuttoncaption : 'Close', //iOS only
	    disallowoverscroll : 'no', //iOS only 
	    toolbar : 'yes', //iOS only 
	    enableViewportScale : 'no', //iOS only 
	    allowInlineMediaPlayback : 'no',//iOS only 
	    presentationstyle : 'pagesheet',//iOS only 
	    fullscreen : 'yes',//Windows only    
	};  

    this.userToImage = navParams.get('profile_pic_url');
    this.userToName = navParams.get('display_name');

  	this.artistsSelected = navParams.get('artists');
    this.gendersSelected = navParams.get('genders');

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileWiewPage');
  }



 ionViewDidEnter(){

 		this.loadValues();

 }

  goToChat(){

    this.navCtrl.push(ChatPage, {
	    	profile_pic_url:this.navParams.get('profile_pic_url'),
			display_name: this.navParams.get('display_name'),
			app_identifier: this.navParams.get('app_identifier')
		}
	);
  }


	copyToClipboard(socialNetwork){


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



  loadValues(){


    	this.abilities = this.navParams.get('users_abilities');
    	           
        for(var i = 0; i < this.socialNetworks.length; i++){

        	this.socialNetworks[i].value = null;
        	
        	if(this.navParams.get(''+this.socialNetworks[i].id) != null && this.navParams.get(''+this.socialNetworks[i].id) != ''){

        		this.socialNetworks[i].value = this.navParams.get(''+this.socialNetworks[i].id);
        	}
        }	

  }


  openWithSystemBrowser(url){
    
    this.iab.create(url, "_system", this.options);
  }

// public openWithInAppBrowser(url : string){
//     let target = "_blank";
//     this.theInAppBrowser.create(url,target,this.options);
// }
// public openWithCordovaBrowser(url : string){
//     let target = "_self";
//     this.theInAppBrowser.create(url,target,this.options);
// }  

  networkAction(network){

  	if(network.id != "id_whatsapp"){

		this.openWithSystemBrowser(network.value)
  	}else{

		this.copyToClipboard(network);  		
  	}


  }


}
