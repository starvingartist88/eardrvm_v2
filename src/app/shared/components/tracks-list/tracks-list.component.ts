import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Track } from '../../../tracks/models/track.model';

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {
  @Input() tracks: Track[];
  @Output() trackDeleted = new EventEmitter<Track>();
  @Output() trackEdited = new EventEmitter<Track>();

  constructor() { }

  ngOnInit() {
  }

  onEdit(track: Track) {
    this.trackEdited.emit(track);
  }

  onDelete(track: Track) {
    this.trackDeleted.emit(track);
  }

  trackByFn(index: any) {
    return index;
  }
}
