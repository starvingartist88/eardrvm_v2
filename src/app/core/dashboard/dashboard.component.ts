import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, empty } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { ProjectsService } from '../../projects/services/projects.service';
import { TracksService } from '../../tracks/services/tracks.service';
import { getUser } from '../../auth/store/auth.selectors';
import { switchMap, take } from 'rxjs/operators';
import { Track } from '../../tracks/models/track.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  projectsSub: Subscription;
  projects = [
    {
      title: 'Project 1',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(97).jpg'
    },
    {
      title: 'Project 2',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(98).jpg'
    },
    {
      title: 'Project 3',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(99).jpg'
    },
    {
      title: 'Project 4',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      photoUrl:
        'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(95).jpg'
    }
  ];

  tracksSub: Subscription;
  tracks: Track[] = [
    {
      id: 1,
      name: 'Example track 1',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 2,
      name: 'Example track 2',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 3,
      name: 'Example track 3',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 4,
      name: 'Example track 4',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 5,
      name: 'Example track 5',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    }
  ];

  constructor(
    private store: Store<AppState>,
    private projectsService: ProjectsService,
    private tracksService: TracksService
  ) {}

  ngOnInit() {
    this.initProjects();
    this.initTracks();
  }

  ngOnDestroy() {
    if (this.projectsSub) {
      this.projectsSub.unsubscribe();
    }

    if (this.tracksSub) {
      this.tracksSub.unsubscribe();
    }
  }

  initProjects() {
    this.projectsSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.projectsService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(projects => {
        if (projects.length === 0) {
          this.projectsService.addProjects(this.projects);
        }
      });
  }

  initTracks() {
    this.tracksSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.tracksService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(tracks => {
        if (tracks.length === 0) {
          this.tracksService.addTracks(this.tracks);
        }
      });
  }
}
