import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Track } from '../models/track.model';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }
  
  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }
  
  add(track: Track, userId: string) {
    const tracks = this.db.list(`tracks/${userId}`);
    return tracks.push(track);
  }
  
  addTracks(tracks: Track[]) {
    const userId = this.userId;
    
    if (userId) {
      tracks.forEach( (track: Track) => {
        this.db.list(`tracks/${userId}`).push(track);
      });
    }
  }
  
  get(userId: string) {
    return this.db.list(`tracks/${userId}`).snapshotChanges();;
  }
  
  update(track: Track, userId: string) {
    return of(this.db.object(`tracks/${userId}/` + track.key)
    .update({
      id: track.id,
      name: track.name,
      description: track.description
    }));
  }
  
  updateSortNumber(track: Track, userId: string) {
    return of(this.db.object(`tracks/${userId}/` + track.key)
    .update({
      sortNumber: track.sortNumber
    }));
  }
  
  delete(track: Track, userId: string) {
    return this.db.object(`tracks/${userId}/` + track .key).remove();
  }
  
  getMax() {
    return this.db.list(`tracks/${this.userId}`).snapshotChanges();
  }
}