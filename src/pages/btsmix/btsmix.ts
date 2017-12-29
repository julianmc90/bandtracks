import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ApiProvider } from './../../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { Device } from '@ionic-native/device';

/**
 * Generated class for the BtsmixPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-btsmix',
  templateUrl: 'btsmix.html',
})
export class BtsmixPage {

  downloadProgress: any;

  songs: Array<any> = [];
  song: any;

  private ws : WebSocket;

  private connectedWs: boolean = false;

  constructor(private appAvailability: AppAvailability, private device: Device, private androidPermissions: AndroidPermissions, private transfer: FileTransfer, private file: File, private platform: Platform, public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public loadingCtrl: LoadingController) {


  }



  	toUrlEncode(obj){
  		var str = [];
	    for (var key in obj) {
	         if (obj.hasOwnProperty(key)) {
	               str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))                  
	         }
	    }
	    return str.join("&");
  	}

	checkDownloadedFiles(){

		// var loaded = true;

		// this.song.tracks.some(item => {

		// 	if(item['downloadProgress'] != 'descargado'){

		// 		loaded = false;
		// 		return true;
		// 	}	
			

		// });


		// if(loaded == true){

		setTimeout(() => {

			this.ws.send(JSON.stringify({action:"mix"}));
		//	 this.ws.send(JSON.stringify({action:"prepare_media_player",file:"p.mp3"}));
	    
	     }, 1000);

		// 	alert("descargado todo!");

		// }

	}


	setSong(song){

		//this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);

		

		 this.song = song;

		 this.checkDownloadedFiles();	

		// this.song.tracks.forEach(item => {
  //       	item['downloadProgress'] = undefined;
		//  	item['fileTransfer'] = this.transfer.create(); 

		// 	item['fileTransfer'].onProgress((progressEvent: any ) => {

		// 		if (progressEvent.lengthComputable) {
					
		// 			item['downloadProgress'] = Math.round((progressEvent.loaded / progressEvent.total) * 100) + " %";
		// 		}

	 //        });

  //      	});




		// this.song.tracks.forEach(item => {

		// 	item['fileTransfer'].download("https://firebasestorage.googleapis.com/v0/b/band-tracks.appspot.com/o/guitars%20critical.mp3?alt=media&token=27c49322-28f1-4ca7-bb0b-0af6c36ce04b", this.file.externalRootDirectory+"music/btsmix/" + 'guitars.mp3').then((entry) => {
			  
		// 	    // alert('download complete: ' + entry.toURL());

		// 		item['downloadProgress'] = "descargado";
		// 		this.checkDownloadedFiles();

		// 	  }, (error) => {
		// 	    // handle error
		// 	    item['downloadProgress'] = "error";
		// 		this.checkDownloadedFiles();

		// 	  	 alert("error"+ JSON.stringify(error))
		// 	});

  //      	});

		// console.log(this.song);


	}

	launchExternalApp(androidPackageName: string) {
		
		let app: string;
		// iosSchemaName: string,
		// Device.device.platform === 'iOS') {
		
		// 	app = iosSchemaName;
		
		// } else if (

		if (this.device.platform === 'Android') {
		
			app = androidPackageName;
			alert("android!");
		}

		this.appAvailability.check(app).then(
			() => { // success callback

				alert("abailable");

				let appStarter = (window as any).startApp.set({ "package": app });
				appStarter.start(function (msg) {
					this.websocketConnect();

		         alert('starting BB app: '+  JSON.stringify(msg));
		      }, function (err) {
		        alert('BB app not installed' + JSON.stringify(err));
		      });

			},
			() => { // error callback
				alert("error...");
			}
		);
	}

	openBtsMixApp() {
		this.launchExternalApp('btsmix.jadlu.com.btsmix');
	}

	websocketConnect(){

	this.ws = new WebSocket("ws://192.168.1.63:5000/live");

	this.ws.onopen = event => { 

		alert("connected");

		  this.apiProvider.getSong({}).then((result) => {

		            if(Array.isArray(result)){

		                if(result.length > 0){

		                	this.songs = result;
		                	this.setSong(result[0]);

		                }else{

		                }
		            }

		          }, (err) => {
		              
		              alert("no data...");
					  console.log(err);
		        });

	 };
       
	//

    this.ws.onmessage = event => { 

    	var data = JSON.parse(event.data);

    	if(data.result =="loadedAll"){

    		alert("loaded");

    		//this.ws.send(JSON.stringify({action:"play"}));

    	

    	}

    	if(data.result =="mixStart"){

    		alert("start of mix");
    	}


    	if(data.result =="mixEnd"){

    		alert("End of mix");
    	}

    };


      

	//this.downloadFile();
	//
	}

  ionViewDidLoad() {

    this.platform.ready().then(() => {
		
		// this.openBtsMixApp();
    	this.websocketConnect();
			
       // ws.onclose = function()
       // { 
       //    // websocket is closed.
       //    alert("Connection is closed..."); 
       // };


  
    });

  
  
  }


  downloadFile(){

	const fileTransfer: FileTransferObject = this.transfer.create();

	this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);

	fileTransfer.download("https://firebasestorage.googleapis.com/v0/b/band-tracks.appspot.com/o/guitars%20critical.mp3?alt=media&token=27c49322-28f1-4ca7-bb0b-0af6c36ce04b", this.file.externalRootDirectory+"music/btsmix/" + 'guitars.mp3').then((entry) => {
	    alert('download complete: ' + entry.toURL());
	  }, (error) => {
	    // handle error
	  	alert("error"+ JSON.stringify(error))
	});


	fileTransfer.onProgress((progressEvent: any ) => {

		if (progressEvent.lengthComputable) {
			//this.downloadProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
             
		}

		
        });

  }

}
