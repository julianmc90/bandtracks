import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LikedMusicalGendersPage } from './liked-musical-genders';

@NgModule({
  declarations: [
    LikedMusicalGendersPage,
  ],
  imports: [
    IonicPageModule.forChild(LikedMusicalGendersPage),
  ],
})
export class LikedMusicalGendersPageModule {}
