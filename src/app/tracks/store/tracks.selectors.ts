import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TracksState } from './tracks.state';

export const getTracksState = createFeatureSelector<TracksState>('tracks');

export const getTracks = createSelector(
  getTracksState,
  tracks => tracks.tracks
);

export const getIsLoading = createSelector(
  getTracksState,
  tracks => tracks.isLoading
);

export const getError = createSelector(
  getTracksState,
  tracks => tracks.error
);
