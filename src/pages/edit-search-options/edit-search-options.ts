import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MusiciansPage } from '../musicians/musicians';
import { ApiProvider } from './../../providers/api/api';
import { LoadingController } from 'ionic-angular';
import { StorageProvider } from './../../providers/storage/storage';


/**
 * Generated class for the EditSearchOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-search-options',
  templateUrl: 'edit-search-options.html',
})
export class EditSearchOptionsPage {

  distance: any;
  searchByAbilities: boolean;
  abilities: any;
  user: any;

  searchByArtists: boolean;

  searchByMusicalGenders: boolean;

  termArtists: String = '';

  termMusicalGender: String = '';

  artists: Array<any> = [];
  artistsSelected: Array<any> = [];

  genders: Array<any> = [];
  gendersSelected: Array<any> = [];

  constructor(public storageProvider : StorageProvider, public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public apiProvider: ApiProvider) {
  	


  }


   ionViewDidEnter(){

    this.loadValues();

 }

 loadValues(){

  this.storageProvider.get("userInfo").then((val) => {

      this.user = val;  
      this.distance =  val['users_kms_search'];
      this.searchByAbilities =  val['search_by_abilities'] == 1 ? true : false; 
      this.searchByMusicalGenders = val['search_by_genders'] == 1 ? true : false;
      this.searchByArtists = val['search_by_artists'] == 1 ? true : false;

      this.abilities = val['users_abilities_pref'];
      
      this.gendersSelected = val['users_musical_genders_pref'];

      this.artistsSelected = val['users_liked_artists_pref'];

      }, (err) => {

    });

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSearchOptionsPage');
  }

  saveSearchOptions(){


	let loading = this.loadingCtrl.create({
	    	content: 'Guardando...'
	  	});

  	loading.present();

      this.storageProvider.get("userInfo").then((val) => {
    	
     	    val['users_abilities_pref'] = this.abilities;
	       	val['users_kms_search'] = this.distance;
			    val['search_by_abilities'] = this.searchByAbilities;
          val['search_by_genders'] = this.searchByMusicalGenders;
          val['search_by_artists'] = this.searchByArtists;

     	   this.storageProvider.set("userInfo",val).then(() => {

            this.apiProvider.updateUserInfo(
      				{
      			   	app_identifier: this.user.app_identifier,
      					userKmsSearch: this.distance, 
      					searchByAbilities:  this.searchByAbilities,
                searchByMusicalGenders: this.searchByMusicalGenders,
                searchByArtists: this.searchByArtists,
      					abilities: this.abilities
      				}
            ).then((result) => {

                // setTimeout(() => {

      			      loading.dismiss();
    				      this.navCtrl.setRoot(MusiciansPage);    		
    			 
    			      // }, 1000);

            }, (err) => {
              
              loading.dismiss();

              alert("error");
              console.log(err);
            
            });
		

               }, (err) => {
                  // alert(JSON.stringify(err));

              });


          }, (err) => {

        });

  }



  addTag(artist){

    console.log("add tag");

    artist['disabled'] = true;

   this.apiProvider.addLikedArtistPref({  
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

          val['users_liked_artists_pref'] = this.artistsSelected;
          
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

  this.apiProvider.removeLikedArtistPref({  
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

          val['users_liked_artists_pref'] = this.artistsSelected;
          
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

    this.apiProvider.searchArtistsPref({
      term: this.termArtists,
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




  addTagGenderPref(gender){

    console.log("add tag");

    gender['disabled'] = true;

    this.apiProvider.addLikedGendersPref({  
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

          val['users_musical_genders_pref'] = this.gendersSelected;
          
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


  removeTagGenderPref(gender){

    gender['disabled'] = true;

    this.apiProvider.removeLikedGendersPref({ 
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

        val['users_musical_genders_pref'] = this.gendersSelected;
          
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


  onSearchEventGenderPref(){

    this.apiProvider.searchGendersPref({
      term: this.termMusicalGender,
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

  onCancelSearchGenderPref(){

    this.genders = [];

  }

}
