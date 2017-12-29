import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { StorageProvider } from './../../providers/storage/storage';


/**
 * Generated class for the NetworksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networks',
  templateUrl: 'networks.html',
})
export class NetworksPage {


    socialNetworks: any;
    user: any;

  constructor(public storageProvider : StorageProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public apiProvider: ApiProvider) {
  
		this.socialNetworks = [

			{
				id:'id_web',
				name:'Web',
				value:'Editar',
				img:'assets/imgs/ic_web_jl.png',
				validate: function(value){
					return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
				}
			},

			{
				id:'id_whatsapp',
				name:'Whatsapp',
				value:'Editar',
				img:'assets/imgs/ic_whatsapp_jl.png',
				validate: function(value){
					return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i.test(value);
				}
			},

			{
				id:'id_instagram',
				name:'Instagram',
				value:'Editar',
				img:'assets/imgs/ic_instagram_jl.png',
				validate: function(value){

					return /^(?:^|[^\w])(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/i.test(value);
				}
			},

			{
				id:'id_facebook',
				name:'Facebook',
				value:'Editar',
				img:'assets/imgs/ic_facebook_jl.png',
				validate: function(value){
 					return /^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(value);
				}
			},

			{
				id:'id_youtube',
				name:'Youtube',
				value:'Editar',
				img:'assets/imgs/ic_youtube_jl.png',
				validate: function(value){
 					return /((http|https):\/\/)?(www\.)?(youtube\.com)(\/)?([a-zA-Z0-9\-\.]+)\/?/.test(value);
				}
			},

			{
				id:'id_twitter',
				name:'Twitter',
				value:'Editar',
				img:'assets/imgs/ic_twitter_jl.png',
				validate: function(value){


					return /(^|[^@\w])@(\w{1,15})\b/i.test(value);
				
				}
			},
		];


		this.loadUserSocialValues();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworksPage');
  }

  loadUserSocialValues(){

    this.storageProvider.get("userInfo").then((val) => {

    		this.user = val;
    		this.setSocialValues();

	}, (err) => {

    });

  }


  setSocialValues(){

    for(var i = 0; i < this.socialNetworks.length; i++){

    	this.socialNetworks[i].value = 'Editar';

    	if(this.user[''+this.socialNetworks[i].id] != null){

    		this.socialNetworks[i].value = this.user[''+this.socialNetworks[i].id];
    	}
    }	

  }

openEditDialogSocial(socialNetwork){

	var valueSocial = null;
	if(socialNetwork.value != 'Editar'){

			valueSocial = socialNetwork.value;
	}

	  let myAlert = this.alertCtrl.create({
	    title: socialNetwork.name,
	    inputs: [
	      {
	        name: 'editText',
	        placeholder: 'Editar',
	        value:valueSocial
	      }
	    ],
	    buttons: [
	      // {
	      //   text: 'Cancelar',
	      //   role: 'cancel',
	      //   handler: data => {
	      //       return true;
	      //   }
	      // },
	      {
	        text: 'Editar',
	        handler: data => {

	        	this.saveSocialValue(socialNetwork, data.editText);
	        
	        }
	      }
	    ]
	  });
	  myAlert.present();
  }


  saveSocialValue(socialNetwork, editTextValue){

  	if(editTextValue == '' || socialNetwork.validate(editTextValue)){
		        	

					this.apiProvider.updateSocialNetwork(
				  	 	{
				  	 		app_identifier: this.user.app_identifier,
							id_network: socialNetwork.id,
							network_value:editTextValue
						}
					).then((result) => {

						if(editTextValue == ''){
							this.user[socialNetwork.id] = null;

						}else{
							this.user[socialNetwork.id] = editTextValue;
						}

				      this.storageProvider.set("userInfo",this.user).then(() => {

			            	this.loadUserSocialValues();
			            	return true;


		               }, (err) => {
		                  // alert(JSON.stringify(err));

		              });

			      }, (err) => {
			        console.log(err);
			      });

	        	}else{

	        		alert("Registra un valor valido");
	        	}

  }
}
