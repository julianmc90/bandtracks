import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { MusiciansPage } from '../pages/musicians/musicians';
import { MessagesPage } from '../pages/messages/messages';

import { BtsmixPage } from '../pages/btsmix/btsmix';
import { ShopsPage } from '../pages/shops/shops';
import { StorageProvider } from '../providers/storage/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  profile_pic_url: string = '';
  display_name: string = '';

  pages: Array<{title: string, component: any,  icon: string}>;

  constructor(public storageProvider : StorageProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      
      
      { title: 'Perfil', component: ProfilePage, icon: 'person'},
      // { title: 'Tiendas', component: ShopsPage, icon: 'basket'},
      { title: 'Músicos', component: MusiciansPage, icon: 'musical-notes'},
      { title: 'Mensajes', component: MessagesPage, icon: 'chatbubbles'},
      // { title: 'Mix', component: BtsmixPage, icon: 'musical-note'},
            
            
    ];


     afAuth.authState.subscribe(user => {

        if (!user) {
            this.nav.setRoot(LoginPage);
            return;
        }
      });

  }

  signOut(){
     this.afAuth.auth.signOut();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  menuOpened(){
    
     if(this.profile_pic_url == ''){
  
        this.storageProvider.get("userInfo").then((val) => {

          this.profile_pic_url = val['profile_pic_url'];
          this.display_name = val['display_name'];
     
          }, (err) => {

        });    

     }


  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
