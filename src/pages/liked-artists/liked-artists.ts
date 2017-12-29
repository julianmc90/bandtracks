import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { StorageProvider } from './../../providers/storage/storage';

/**
 * Generated class for the LikedArtistsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liked-artists',
  templateUrl: 'liked-artists.html',
})
export class LikedArtistsPage {

  user: any;
  term: String = '';
  artists: Array<any> = [];
  artistsSelected: Array<any> = [];

  constructor(public storageProvider : StorageProvider, public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikedArtistsPage');



	  this.storageProvider.get("userInfo").then((val) => {

	  	this.user = val;

	   }, (err) => {

	  });



  }


   ionViewDidEnter(){

      this.storageProvider.get("userInfo").then((val) => {

      	this.artistsSelected = val['artists'];

           }, (err) => {

          });


   }


  

  addTag(artist){

  	console.log("add tag");

  	artist['disabled'] = true;

	this.apiProvider.addLikedArtist({	
	  		artist_id: artist.id,
	  		app_identifier: this.user.app_identifier
  		}).then((result) => {

		artist['disabled'] = false;

	  	this.artistsSelected.push(artist);

		for (var i = 0; i < this.artists.length; i++) {
	  		
	  		if(this.artists[i].id == artist.id){

	  			this.artists.splice(i,1);
	  		}
	  	
	  	}

  	    this.storageProvider.get("userInfo").then((val) => {

	      	val['artists'] = this.artistsSelected;
	      	
	      	this.storageProvider.set("userInfo",val).then(() => {

	           }, (err) => {
	              // alert(JSON.stringify(err));

              });


           }, (err) => {

          });


       }, (err) => {
          
        alert("no data...");
	    console.log(err);
    });


  }


  removeTag(artist){

  	artist['disabled'] = true;

	this.apiProvider.removeLikedArtist({	
	  		artist_id: artist.id,
	  		app_identifier: this.user.app_identifier
  		}).then((result) => {

  		artist['disabled'] = false;	

	  	this.artists.push(artist);


	  	for (var i = 0; i < this.artistsSelected.length; i++) {
	  		
	  		if(this.artistsSelected[i].id == artist.id){

	  			this.artistsSelected.splice(i,1);
	  		}
	  	
	  	}


  	    this.storageProvider.get("userInfo").then((val) => {

	      	val['artists'] = this.artistsSelected;
	      	
	      	this.storageProvider.set("userInfo",val).then(() => {

	           }, (err) => {
	              // alert(JSON.stringify(err));

              });


           }, (err) => {

          });

	  	
       }, (err) => {
		

        alert("no data...");
	    console.log(err);
    });


  	console.log("remove tag");
  
  }


  onSearchEvent(){

    this.apiProvider.searchArtists({
    	term: this.term,
		app_identifier: this.user.app_identifier
	}).then((result) => {


            if(Array.isArray(result)){

                if(result.length == 0){

                  // this.thereAreResults = false;
					this.artists = []; 
                }else{

                  this.artists = result; 

                }
            }

          }, (err) => {
              
              alert("no data...");

              console.log(err);
          });







  }

  onCancelSearch(){

  	this.artists = [];

  }

}
