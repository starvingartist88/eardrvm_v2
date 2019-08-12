import { Component, OnInit, OnDestroy } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';

import * as fromTracks from '../store/tracks.actions';
import { Track } from '../models/track.model';
import { Subscription, Observable } from 'rxjs';
import { getTracks, getIsLoading } from '../store/tracks.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { TracksModalComponent } from '../../shared/components/tracks-modal/tracks-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  tracks: Track[] | null;
  modalRef: MDBModalRef;
  
  tracksSub: Subscription;
  
  modalConfig = {
    class: 'modal-dialog-centered'
  };
  
  lastTrackIndex: number;
  
  constructor(private modalService: MDBModalService, private store: Store<AppState>, private afAuth: AngularFireAuth) { }
  
  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
    
    this.tracksSub = this.store.select(getTracks).pipe(
      map( (tracks: Track[]) => {
        if (this.user && !tracks) {
          this.store.dispatch(new fromTracks.TracksQuery());
        }
        return tracks;
      })
    )
    .subscribe( (tracks: Track[]) => {
      if (tracks && tracks.length !== 0) {
        const index: number = Number(tracks[tracks.length - 1].id);
        this.lastTrackIndex = index;
      } else {
        this.lastTrackIndex = 0;
      }
      
      this.tracks = tracks;
    });
  }
  
  get user() {
    return this.afAuth.auth.currentUser;
  }
  
  ngOnDestroy() {
    if (this.tracksSub) {
      this.tracksSub.unsubscribe();
    }
  }
  
  onAddTrack() {
    this.modalRef = this.modalService.show(TracksModalComponent, this.modalConfig);
    
    this.modalRef.content.heading = 'Add new track';
    this.modalRef.content.track.id = this.lastTrackIndex + 1;
    
    this.modalRef.content.trackData.pipe(take(1)).subscribe( (trackData: Track) => {
      this.store.dispatch(new fromTracks.TracksAdded({ track: trackData }));
    });
  }
  
  openEditTrackModal(track: Track) {
    this.modalRef = this.modalService.show(TracksModalComponent, this.modalConfig);
    
    this.modalRef.content.heading = 'Edit track';
    const trackCopy = {
      key: track.key,
      id: track.id || null,
      name: track.name || null,
      description: track.description || null
    };
    this.modalRef.content.track = trackCopy;
    
    this.modalRef.content.trackData.pipe(take(1)).subscribe( (trackData: Track) => {
      this.store.dispatch(new fromTracks.TracksEdited({ track: trackData }));
    });
  }
  
  editSortNumber(track: Track) {
    this.store.dispatch(new fromTracks.TracksSortEdited({ track: track }));
    
  }
  
  openConfirmModal(track: Track) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);
    
    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromTracks.TracksDeleted({ track }));
      }
    });
  }
  
  onTrackEdit(track: Track) {
    this.openEditTrackModal(track);
  }
  
  onTrackDelete(track: Track) {
    this.openConfirmModal(track);
  }
  
}
