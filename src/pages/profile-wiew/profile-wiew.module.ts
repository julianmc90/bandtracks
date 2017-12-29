import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileWiewPage } from './profile-wiew';

@NgModule({
  declarations: [
    ProfileWiewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileWiewPage),
  ],
})
export class ProfileWiewPageModule {}
