import { Track } from '../models/track.model';

export interface TracksState {
    tracks: Track[] | null;
    isLoading: boolean;
    error: any;
}

export const tracksInitialState: TracksState = {
    tracks: null,
    isLoading: true,
    error: null
};
