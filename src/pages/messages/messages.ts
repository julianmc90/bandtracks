import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { ChatPage } from '../chat/chat';
import { StorageProvider } from './../../providers/storage/storage';


/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

	messageHistorials: Array<any> = [];

  constructor(public storageProvider : StorageProvider, public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {


        this.storageProvider.get("userInfo").then((val) => {

	    	
	 			this.apiProvider.getMessageHistorials(
		  	 	{
		  	 		app_identifier: val['app_identifier']
				}
			).then((result) => {

				if(Array.isArray(result)){

					for(var i = 0; i < result.length; i++){

						this.messageHistorials.push(result[i]);	
					}

				}

				console.log(result);
    
	      }, (err) => {
	        console.log(err);
	      });

	    	
		 }, (err) => {

                        // alert(JSON.stringify(err));

        });

  }

  goToChat(musician){
  	

    this.navCtrl.push(ChatPage, musician);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

}
