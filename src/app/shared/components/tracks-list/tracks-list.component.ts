import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Track } from '../../../tracks/models/track.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}

