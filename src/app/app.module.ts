import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { InterceptorModule } from '../interceptors/interceptor.module';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { MusiciansPage } from '../pages/musicians/musicians';
import { EditAbilitiesPage } from '../pages/edit-abilities/edit-abilities';
import { EditSearchOptionsPage } from '../pages/edit-search-options/edit-search-options';
import { ChatPage } from '../pages/chat/chat';

import { NativeStorage } from '@ionic-native/native-storage';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { MessagesPage } from '../pages/messages/messages';
import { NetworksPage } from '../pages/networks/networks';
import { ProfileWiewPage } from '../pages/profile-wiew/profile-wiew';
import { BtsmixPage } from '../pages/btsmix/btsmix';
import { File } from '@ionic-native/file';
import { Clipboard } from '@ionic-native/clipboard';
import { ShopsPage } from '../pages/shops/shops';
import { LikedArtistsPage } from '../pages/liked-artists/liked-artists';
import { LikedMusicalGendersPage } from '../pages/liked-musical-genders/liked-musical-genders';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';

import { Device } from '@ionic-native/device';
import { Ionic2RatingModule } from 'ionic2-rating';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { ApiProvider } from '../providers/api/api';

import { HTTP } from '@ionic-native/http';
import { StorageProvider } from '../providers/storage/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyAw2tkiLHR7AhhsVjash3M29Uk-xxhjoGg",
  authDomain: "band-tracks.firebaseapp.com",
  databaseURL: "https://band-tracks.firebaseio.com",
  projectId: "band-tracks",
  storageBucket: "band-tracks.appspot.com",
  messagingSenderId: "400617396637"
};

    

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    MusiciansPage,
    EditAbilitiesPage,
    EditSearchOptionsPage,
    ChatPage,
    MessagesPage,
    NetworksPage,
    BtsmixPage,
    ProfileWiewPage,
    ShopsPage,
    LikedArtistsPage,
    LikedMusicalGendersPage
  ],
  imports: [
    HttpClientModule,
    InterceptorModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    MusiciansPage,
    EditAbilitiesPage,
    EditSearchOptionsPage,
    ChatPage,
    MessagesPage,
    NetworksPage,
    BtsmixPage,
    ProfileWiewPage,
    ShopsPage,
    LikedArtistsPage,
    LikedMusicalGendersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Diagnostic,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    ApiProvider,
    Geolocation,
    HTTP,
    FileTransfer, 
    FileTransferObject,
    File,
    Clipboard,
    AndroidPermissions,
    InAppBrowser, 
    AppAvailability, 
    Device,
    NativeStorage,
    StorageProvider    
  ]
})
export class AppModule {}
