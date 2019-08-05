import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksComponent } from './containers/tracks.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule } from 'angular-bootstrap-md';

import * as fromTracks from './store/tracks.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TracksEffects } from './store/tracks.effects';
import { TracksRoutingModule } from './tracks-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TracksRoutingModule,
    ModalModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    TableModule,
    StoreModule.forFeature('tracks', fromTracks.tracksReducer),
    EffectsModule.forFeature([TracksEffects])
  ],
  declarations: [TracksComponent],
  exports: [TracksComponent],
})
export class TracksModule { }
