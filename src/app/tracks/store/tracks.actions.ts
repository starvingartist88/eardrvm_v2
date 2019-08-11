import { Action } from '@ngrx/store';
import { Track } from '../models/track.model';

export enum TracksActionTypes {
  TRACK_QUERY = '[Tracks] Query',
  TRACKS_LOADED = '[Tracks] Fetched',

  TRACKS_ADDED = '[Tracks] Added',
  TRACKS_EDITED = '[Tracks] Edited',
  TRACKS_SORT_EDITED = '[Tracks] SortEdited',
  TRACKS_DELETED = '[Tracks] Deleted',

  TRACKS_ERROR = '[Tracks] Error'
}

export class TracksQuery implements Action {
  readonly type = TracksActionTypes.TRACK_QUERY;
}

export class TracksLoaded implements Action {
  readonly type = TracksActionTypes.TRACKS_LOADED;

  constructor(public payload: { tracks: Track[] }) {}
}

export class TracksAdded implements Action {
  readonly type = TracksActionTypes.TRACKS_ADDED;

  constructor(public payload: { track: Track }) {}
}

export class TracksEdited implements Action {
  readonly type = TracksActionTypes.TRACKS_EDITED;

  constructor(public payload: { track: Track }) {}
}

export class TracksSortEdited implements Action {
  readonly type = TracksActionTypes.TRACKS_SORT_EDITED;

  constructor(public payload: { track: Track }) {}
}



export class TracksDeleted implements Action {
  readonly type = TracksActionTypes.TRACKS_DELETED;

  constructor(public payload: { track: Track }) {}
}

export class TracksError implements Action {
  readonly type = TracksActionTypes.TRACKS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type TracksActions =
  | TracksQuery
  | TracksLoaded
  | TracksAdded
  | TracksEdited
  | TracksDeleted
  | TracksError;
