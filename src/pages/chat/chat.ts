import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { StorageProvider } from './../../providers/storage/storage';


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {

	@ViewChild(Content) content: Content;

	messages: Array<any>= [];
	addMessagesFromListener: boolean = false;

	myId : String = "";
	toId : String = "";

	refTo: any;

	message: string = '';

	userToImage: string = '';
	userToName: string = '';


    constructor(public storageProvider : StorageProvider, public navCtrl: NavController, private navParams: NavParams, public afDB: AngularFireDatabase, public apiProvider: ApiProvider) {




		this.storageProvider.get("userInfo").then((result) => {
	    	
	        this.userToImage = navParams.get('profile_pic_url');
	        this.userToName = navParams.get('display_name');

	        this.toId = navParams.get('app_identifier');

	    	this.myId = result['app_identifier'];	    		

	    	//Other User ref
		   	this.refTo = afDB.list('/users/'+this.toId+'/conversations/'+this.myId);
			this.loadLastMessages();	   	


	     }, (err) => {
	     	console.log(err);
	    });


    	

  }

  loadLastMessages(){


 	this.apiProvider.getLastestMessages(
		  	 	{
		  	 		app_identifier_from: this.myId,
					app_identifier_to: this.toId,
				}
			).then((result) => {

				if(Array.isArray(result)){

					for(var i = 0; i < result.length; i++){

						this.messages.push(result[i]);	
					}

					this.setMessagesListener();

				}


    
      }, (err) => {
        console.log(err);
      });



  }

  setMessagesListener(){


		//Own Database ref
	  	this.afDB.list('/users/'+this.myId+'/conversations/'+this.toId, ref => ref.limitToLast(1)).stateChanges(['child_added']).subscribe(items => {

		   	  if(this.addMessagesFromListener){

				// console.log(action.type);
				// console.log(action.key);
				// console.log(action.payload.val());
		 		// console.log(items.payload.val().name);
				// console.log(this.messages);
				
				this.putMessageFromListener(items.payload.val().text, items.key);

			  }else{


				  	this.apiProvider.checkMessageExists(
							{
								key_message: items.key	
							}
						).then((result) => {

							var res = JSON.parse(JSON.stringify(result));

							if(res.message == 'not_exists'){

								this.putMessageFromListener(items.payload.val().text, items.key);
							}	

				    
				    }, (err) => {
				      console.log(err);
				    });
		  			

	               this.addMessagesFromListener = true;
	          }
		
		});

  }

  putMessageFromListener(text, key){

  	this.messages.push({text: text, fromId: this.toId, toId: this.myId, key_message:key});	

   	this.scrollToBottomPage();


  }

  saveMessage(){

  	//save message to notify
	this.refTo.push({ text: this.message })
	.then( res => this.relateMessage(res.key)).catch(err => console.log(err, 'You do not have access!')); 
	
  }

  scrollToBottomPage(){

  	let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+100, 100);
  }

  relateMessage(key){

	  	this.apiProvider.saveMessage(
			  	 	{
			  	 		app_identifier_from: this.myId,
						app_identifier_to: this.toId,
						message: this.message,
						key_message: key
					}
				).then((result) => {

					this.messages.push({text: this.message, fromId: this.myId, toId: this.toId, key_message:key});	   
					this.message = '';
					this.scrollToBottomPage();	
					console.log("success", result);
	    
	      }, (err) => {
	        console.log(err);
	      });

	

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}



