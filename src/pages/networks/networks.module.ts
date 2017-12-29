import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworksPage } from './networks';

@NgModule({
  declarations: [
    NetworksPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworksPage),
  ],
})
export class NetworksPageModule {}
