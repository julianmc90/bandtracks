import { HttpClient,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
 	
  apiHost: string; 	
  apiWeb: string;
  localServer: string;
  constructor(public http: HttpClient, private httpNative: HTTP) {
  	
  	// 
  	//this.apiHost = "http://jadlu.com/btapi/";
 
  	this.apiHost = "http://192.168.1.54:81/btapi/";

    //this.apiHost = "http://192.168.1.68/btapi/";

  	//btsmix
	//this.localServer = "http://192.168.1.63:5000/"

	//this.apiHost = "http://192.168.1.68/btapi/";

  	// this.apiWeb = "http://jadlu.com/prueba/";

//  	this.httpNative.setHeader('Accept', 'application/json');

//	this.httpNative.setHeader('Content-Type', 'application/json');
  	
	 		
  }






 //  tryHttp(data){


 //  	return new Promise((resolve, reject) => {
	
	// this.httpNative.post(this.apiHost+'UsersAbilities/saveAbilities', data, {}).then(data => {

	// 		    console.log(data.status);
	// 		    console.log(data.data); // data received by server
	// 		    console.log(data.headers);

	// 		       resolve(data);

	// 		  })
	// 		  .catch(error => {

	// 		    console.log(error.status);
	// 		    console.log(error.error); // error message as string
	// 		    console.log(error.headers);

	// 		    reject(error);

	// 		  });

	// });		  


 //  }

  getAbilities() {
 	 return new Promise(resolve => {
    	this.http.get(this.apiHost+'Abilities/getAbilities').subscribe(data => {
    	   console.log(data);
    	  resolve(data);
	    }, err => {
	      console.log(err);
	    });
 	 });
	}


	registerUser(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'users/registerUser', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

	getSong(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'Songs/getSong', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}





	getUserInfo(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'users/getUserInfo', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}


	searchUsers(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'users/searchUsers', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

	saveAbilities(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'UsersAbilities/saveAbilities', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

	updateUserInfo(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'users/updateUserInfo', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

	saveMessage(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'messages/saveMessage', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}


	getLastestMessages(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'messages/getLastestMessages', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

	checkMessageExists(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'messages/checkMessageExists', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}


	getMessageHistorials(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'messages/getMessageHistorials', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}


	updateSocialNetwork(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'users/updateSocialNetwork', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	
	searchShops(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'Shops/searchShops', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	
	searchArtists(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'artists/searchArtists', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	

	addLikedArtist(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'artists/addLikedArtist', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	
	removeLikedArtist(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'artists/removeLikedArtist', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}	



	searchArtistsPref(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'artists/searchArtistsPref', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	

	addLikedArtistPref(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'artists/addLikedArtistPref', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	
	removeLikedArtistPref(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'artists/removeLikedArtistPref', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}	







	searchGenders(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'genders/searchGenders', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	

	addLikedGenders(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'genders/addLikedGenders', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	
	removeLikedGenders(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'genders/removeLikedGenders', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}	

	searchGendersPref(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'genders/searchGendersPref', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	

	addLikedGendersPref(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'genders/addLikedGendersPref', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
	
	removeLikedGendersPref(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiHost+'genders/removeLikedGendersPref', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}	



}
