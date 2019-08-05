import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../auth/models/user.model';
import { Project } from '../../../projects/models/project.model';
import { Track } from '../../../tracks/models/track.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() projects: Project[];
  @Input() tracks: Track[];
  @Input() userProjectsLoading: boolean;
  @Input() userTracksLoading: boolean;
  @Output() detailsClosed = new EventEmitter<any>();
  @Output() projectsLoad = new EventEmitter<any>();
  @Output() tracksLoad = new EventEmitter<any>();
  @Output() projectDeleted = new EventEmitter<Project>();
  @Output() trackDeleted = new EventEmitter<Track>();
  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  closeDetails() {
    this.detailsClosed.emit();
  }

  loadProjects() {
    this.projectsLoad.emit();
  }

  loadTracks() {
    this.tracksLoad.emit();
  }

  onProjectDelete(project: Project) {
    this.projectDeleted.emit(project);
  }

  onTrackDelete(track: Track) {
    this.trackDeleted.emit(track);
  }

  onAddAdmin() {
    this.addAdmin.emit(this.user);
  }

  onRemoveAdmin() {
    this.removeAdmin.emit(this.user);
  }
}
