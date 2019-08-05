import { tracksInitialState, TracksState } from './tracks.state';
import { TracksActions, TracksActionTypes } from './tracks.actions';

export function tracksReducer(state = tracksInitialState, action: TracksActions): TracksState {
  switch (action.type) {

    case TracksActionTypes.TRACK_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case TracksActionTypes.TRACKS_LOADED: {
      return Object.assign({}, state, {
        tracks: action.payload.tracks,
        isLoading: false,
      });
    }

    case TracksActionTypes.TRACKS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
