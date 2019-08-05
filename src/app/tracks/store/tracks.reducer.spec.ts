import { tracksReducer } from './tracks.reducer';
import { tracksInitialState } from './tracks.state';

describe('Tracks Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = tracksReducer(tracksInitialState, action);

      expect(result).toBe(tracksInitialState);
    });
  });
});
