import { TracksModule } from './tracks.module';

describe('TracksModule', () => {
  let tracksModule: TracksModule;

  beforeEach(() => {
    tracksModule = new TracksModule();
  });

  it('should create an instance', () => {
    expect(tracksModule).toBeTruthy();
  });
});
