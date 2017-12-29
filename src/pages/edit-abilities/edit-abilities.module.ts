import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAbilitiesPage } from './edit-abilities';

@NgModule({
  declarations: [
    EditAbilitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAbilitiesPage),
  ],
})
export class EditAbilitiesPageModule {}
