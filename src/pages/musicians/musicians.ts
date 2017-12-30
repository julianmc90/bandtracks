import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiProvider } from './../../providers/api/api';
import { EditSearchOptionsPage } from '../edit-search-options/edit-search-options';
import { Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ProfileWiewPage } from '../profile-wiew/profile-wiew';
import { StorageProvider } from './../../providers/storage/storage';


/**
 * Generated class for the MusiciansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-musicians',
  templateUrl: 'musicians.html',
})
export class MusiciansPage {

  musicians: Array<any> = [];
  latitude: any;
  longitude: any;
  subscription: any;
  showErrorResults: boolean = false;
  thereAreResults: boolean = true;

  constructor(public storageProvider : StorageProvider, private platform: Platform,private diagnostic: Diagnostic, public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider,private geolocation: Geolocation, public alertCtrl: AlertController) {
 	    
      
  
  }



   ionViewDidEnter(){

      this.loadMusicians(); 

   }


  loadMusicians(){


      this.showErrorResults = false;
      this.thereAreResults = true;
    
     // this.platform.ready().then(() => {

        //   this.diagnostic.isLocationEnabled().then((resultIsEnabled) => {

          //    if(resultIsEnabled === true){

                this.geolocation.getCurrentPosition({enableHighAccuracy:true, maximumAge: 3000, timeout: 5000}).then((resp) => {

                      this.storageProvider.get("userInfo").then((val) => {

                              this.latitude = resp.coords.latitude;
                              this.longitude = resp.coords.longitude;
                              this.searchUsers(val);

  
                       }, (err) => {

                      });


                }).catch((error) => {
                  
                  //alert(error.message);                            

                   this.showErrorResults = true;

                });
                        
  //             }else{

  //               this.showErrorResults = true;
  //             }


          
  //         }).catch((error) => {

  //             this.showErrorResults = true;
  //      });

  // });


    

  }


  ionViewDidLoad() {
      

  }


  goToChat(musician){


    this.navCtrl.push(ProfileWiewPage, musician);
  }

  searchUsers(user){

          
          var data = {
            app_identifier: user.app_identifier, 
            usersKmsRadius: user.users_kms_search,
            searchByAbilities: user.search_by_abilities,
            searchByMusicalGenders : user.search_by_genders,
            searchByArtists : user.search_by_artists,
            latitude: this.latitude,
            longitude: this.longitude,
            abilities:[],
            usersLikedArtistsPrefIds:[],
            usersLikedGendersPrefIds:[]
          }

  
          if(user.search_by_artists == true){
            
            for (var i = 0; i < user.users_liked_artists_pref.length; i++) {
                data.usersLikedArtistsPrefIds.push(user.users_liked_artists_pref[i].id);
            }
            
          }



          if(user.search_by_genders == true){

            for (var i = 0; i < user.users_musical_genders_pref.length; i++) {
                data.usersLikedGendersPrefIds.push(user.users_musical_genders_pref[i].id);
            }


            
          }



          if(user.search_by_abilities == true){
            
              data.abilities = user.users_abilities_pref;

          }

          this.apiProvider.searchUsers(data).then((result) => {


            if(Array.isArray(result)){

                if(result.length == 0){

                  this.thereAreResults = false;
                }else{

                  this.musicians = result; 

                }
            }

          }, (err) => {
              
              alert("no data...");

              console.log(err);
          });


    }

  goToEditSeachOptions(){

      this.navCtrl.push(EditSearchOptionsPage);
  
  }

}
