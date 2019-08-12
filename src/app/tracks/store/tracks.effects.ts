import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TracksService } from '../services/tracks.service';
import { TracksActionTypes } from './tracks.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Track } from '../models/track.model';

import * as fromTracks from './../store/tracks.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

@Injectable()
export class TracksEffects {
  
  constructor(private actions$: Actions, private tracksService: TracksService, private store: Store<AppState>) {}
  
  @Effect()
  query$ = this.actions$.pipe(
    ofType(TracksActionTypes.TRACK_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.tracksService.get(user.uid)
    .pipe(
      map((data: any) => {
        
        let tracksData: Track[] = data.map((res: any) => {
          const key = res.payload.key;
          const track: Track = res.payload.val();
          return {
            key: key,
            id: track.id,
            name: track.name,
            description: track.description,
            imageUrl: track.imageUrl,
            audioUrl: track.audioUrl,
            sortNumber: track.sortNumber
          };
        });
        tracksData=tracksData.sort((a, b) => a.sortNumber < b.sortNumber ? -1 : a.sortNumber > b.sortNumber ? 1 : 0)
        return (new fromTracks.TracksLoaded({ tracks: tracksData }));
      }),
      catchError(error => {
        return of(new fromTracks.TracksError({ error }));
      })
    )
  ),
);

@Effect({ dispatch: false })
added$ = this.actions$.pipe(
  ofType(TracksActionTypes.TRACKS_ADDED),
  map((action: fromTracks.TracksAdded) => action.payload),
  withLatestFrom(this.store.pipe(select(getUser))),
  switchMap(([payload, user]: any) => this.tracksService.add(payload.track, user.uid))
);

@Effect({ dispatch: false })
edit$ = this.actions$.pipe(
  ofType(TracksActionTypes.TRACKS_EDITED),
  map((action: fromTracks.TracksEdited) => action.payload),
  withLatestFrom(this.store.pipe(select(getUser))),
  switchMap(([payload, user]: any) => this.tracksService.update(payload.track, user.uid)
  .pipe(
    catchError( error => {
      return of(new fromTracks.TracksError({ error }));
    }))
  )
);

@Effect({ dispatch: false })
editSort$ = this.actions$.pipe(
  ofType(TracksActionTypes.TRACKS_SORT_EDITED),
  map((action: fromTracks.TracksSortEdited) => action.payload),
  withLatestFrom(this.store.pipe(select(getUser))),
  switchMap(([payload, user]: any) => this.tracksService.updateSortNumber(payload.track, user.uid)
  .pipe(
    catchError( error => {
      return of(new fromTracks.TracksError({ error }));
    }))
  )
);

@Effect({ dispatch: false })
delete$ = this.actions$.pipe(
  ofType(TracksActionTypes.TRACKS_DELETED),
  map((action: fromTracks.TracksDeleted) => action.payload),
  withLatestFrom(this.store.pipe(select(getUser))),
  switchMap(([payload, user]: any) => this.tracksService.delete(payload.track, user.uid))
);
}
