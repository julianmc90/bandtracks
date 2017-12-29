import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LikedArtistsPage } from './liked-artists';

@NgModule({
  declarations: [
    LikedArtistsPage,
  ],
  imports: [
    IonicPageModule.forChild(LikedArtistsPage),
  ],
})
export class LikedArtistsPageModule {}
