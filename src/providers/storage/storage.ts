import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(private platform: Platform,private nativeStorage: NativeStorage,private storage: Storage) {



  }


  set(identifier, objectValue){

 	return new Promise((resolve,reject) => {
   	    if (this.platform.is('android')) {
	 	
	 	  	this.nativeStorage.setItem(identifier, objectValue)
			  .then(
			    () => resolve(),
			    error =>  reject()
			  );
	     }else{

	     	this.storage.set('userInfo', objectValue);
	     	resolve();
	     }

     });

  }

  get(identifier){

 	return new Promise((resolve,reject) => {
   	    
   	    if (this.platform.is('android')) {

   	    	this.nativeStorage.getItem(identifier).then(
			    data => resolve(data),
			    error => reject(error)
			  );

		  }else{

  	  		this.storage.get(identifier).then((val) => {
    			resolve(val)
  			});

		  }

     });

  }


}
