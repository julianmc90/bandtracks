import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


import { ApiProvider } from './../../providers/api/api';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 //films: Observable<any[]>; 
 //items: Observable<any[]>;

  constructor(public navCtrl: NavController, 
  	afDB: AngularFireDatabase,public apiProvider: ApiProvider 
  	) {
    
   
   //this.items = afDB.list('cuisines').valueChanges();

   //this.films = this.apiProvider.getAbilities();

  

  }

  
  
}
