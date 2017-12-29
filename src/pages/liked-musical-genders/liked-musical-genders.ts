import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { StorageProvider } from './../../providers/storage/storage';

/**
 * Generated class for the LikedMusicalGendersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liked-musical-genders',
  templateUrl: 'liked-musical-genders.html',
})
export class LikedMusicalGendersPage {

  user: any;		
  term: String = '';
  genders: Array<any> = [];
  gendersSelected: Array<any> = [];

  constructor(public storageProvider : StorageProvider, public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
	    console.log('ionViewDidLoad LikedMusicalGendersPage');

      this.storageProvider.get("userInfo").then((val) => {

      	this.user = val;

           }, (err) => {

          });
  }


   ionViewDidEnter(){

      this.storageProvider.get("userInfo").then((val) => {

      	this.gendersSelected = val['genders'];
      	
           }, (err) => {

          });


   }


  

  addTag(gender){

  	console.log("add tag");

  	gender['disabled'] = true;

	  this.apiProvider.addLikedGenders({	
	  		gender_id: gender.id,
	  		app_identifier: this.user.app_identifier
  		}).then((result) => {

		  gender['disabled'] = false;

	  	this.gendersSelected.push(gender);

  		for (var i = 0; i < this.genders.length; i++) {
  	  		
  	  		if(this.genders[i].id == gender.id){

  	  			this.genders.splice(i,1);
  	  		}
  	  	
  	  	}

  	    this.storageProvider.get("userInfo").then((val) => {

	      	val['genders'] = this.gendersSelected;
	      	
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


  removeTag(gender){

  	gender['disabled'] = true;

	  this.apiProvider.removeLikedGenders({	
	  		gender_id: gender.id,
	  		app_identifier: this.user.app_identifier
  		}).then((result) => {

  		gender['disabled'] = false;	

	  	this.genders.push(gender);

	  	for (var i = 0; i < this.gendersSelected.length; i++) {
	  		
	  		if(this.gendersSelected[i].id == gender.id){

	  			this.gendersSelected.splice(i,1);
	  		}
	  	
	  	}

  	  this.storageProvider.get("userInfo").then((val) => {

	    	val['genders'] = this.gendersSelected;
	      	
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

    this.apiProvider.searchGenders({
    	term: this.term,
  		app_identifier: this.user.app_identifier
	  }).then((result) => {

        if(Array.isArray(result)){

              if(result.length == 0){

                // this.thereAreResults = false;
	        			this.genders = []; 
              
              }else{

              	this.genders = result; 

              }
          }

        }, (err) => {
            
          alert("no data...");
          console.log(err);
    });

  }

  onCancelSearch(){

  	this.genders = [];

  }

}
