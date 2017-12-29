import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

import { LoadingController } from 'ionic-angular';

import { ApiProvider } from './../../providers/api/api';

import { StorageProvider } from './../../providers/storage/storage';

import { Observable } from 'rxjs/Observable';

import { HomePage } from '../home/home';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth, 
  	afDB: AngularFireDatabase,
    private fb: Facebook, 
  	private platform: Platform,
    public apiProvider: ApiProvider,
    public storageProvider : StorageProvider,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController) {
  	
  
   afAuth.authState.subscribe(user => {



      if (user) {

      

        let loading = this.loadingCtrl.create({
          content: 'Cargando...'
        });

        loading.present();

         var newUser = {
            app_identifier:user.uid,
            email:user.email,
            display_name:user.displayName,
            users_kms_search:"1",
            profile_pic_url:user.photoURL,
            longitude:"-75.694338900000",
            latitude: "4.520216200000"
        };
          
         
        this.apiProvider.registerUser(newUser).then((result) => {
        
//            console.log(result);

            this.apiProvider.getUserInfo({app_identifier:user.uid}).then((result) => {

              afDB.object('users/'+result['app_identifier']).update({email:result['email'],display_name:result['display_name']});
              
              this.storageProvider.set("userInfo",result).then(() => {

                  this.menuCtrl.enable(true, 'main');
                  loading.dismiss();
                  this.navCtrl.setRoot(HomePage);

               }, (err) => {
                  // alert(JSON.stringify(err));

              });


            }, (err) => {
              console.log(err);

                 loading.dismiss();

            });

        }, (err) => {

                   loading.dismiss();

          console.log(err);
        });

          return;
      }

    });
   

  }


  ionViewDidLoad() {

    this.menuCtrl.enable(false, 'main');

    console.log('ionViewDidLoad LoginPage');
  }



  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential);
        
      })
    }
    else {
	      return this.afAuth.auth
	        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
	        .then(res => console.log(res)
           );
    	}
  	}
}
