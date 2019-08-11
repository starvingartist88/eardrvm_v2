import { AppState } from './../../../reducers/index';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Track } from '../../../tracks/models/track.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MyFireService } from '../../myfire.service';
import { NotificationService } from 'src/app/notification/notification.service';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';
import { getTracks } from 'src/app/tracks/store/tracks.selectors';
import { AngularFireAuth } from '@angular/fire/auth';
import * as fromTracks from 'src/app/tracks/store/tracks.actions';


@Component({
  selector: 'app-tracks-modal',
  templateUrl: './tracks-modal.component.html',
  styleUrls: ['./tracks-modal.component.scss']
})
export class TracksModalComponent implements OnInit {
  @ViewChild('trackForm') trackForm: NgForm;
  
  heading: string;
  track: Track = {};
  trackData: Subject<Track> = new Subject();
  tracksSub: Subscription;
  lastTrackIndex: number;
  
  constructor(public modalRef: MDBModalRef, private myFire: MyFireService, private _notifier: NotificationService, private store: Store<AppState>,private afAuth: AngularFireAuth) { }
  
  ngOnInit() { }
  
  onFileSelection(event) {
    const fileList: FileList = event.target.files;
    
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file)
      .then(({fileUrl})=> {
        this.track.imageUrl = fileUrl
        this._notifier.display('success', 'Track Successfully Uploaded. Please Save!'!)
      }); 
    }
    
  }
  
  onFileSelection2(event) {
    const fileList: FileList = event.target.files;
    
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file)
      .then(({fileUrl})=> {
        this.track.audioUrl = fileUrl
        this._notifier.display('success', 'Track Successfully Uploaded. Please Save!'!)
      }); 
    }
    
  }
  
  
  
  onSave() {
    
    //need to move this section as a function - start
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
        const index: number = Number(tracks[tracks.length - 1].sortNumber);
        this.lastTrackIndex = index;
      } else {
        this.lastTrackIndex = 0;
      }
      
      this.track['sortNumber']=tracks.length<=0?1:Math.max.apply(Math, tracks.map(function(o) { return o.sortNumber; }))+1;
    });

    //need to move this section as a function - end
    
    if (this.trackForm.valid) {
      this.trackData.next(this.track);
      this.modalRef.hide();
    } else {
      const controls = this.trackForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }
  
  get user() {
    return this.afAuth.auth.currentUser;
  }
  
  
}
