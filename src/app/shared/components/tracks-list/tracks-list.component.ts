import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Track } from '../../../tracks/models/track.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {
  @Input() tracks: Track[];
  @Output() trackDeleted = new EventEmitter<Track>();
  @Output() trackEdited = new EventEmitter<Track>();
  @Output() trackEditSortNumber = new EventEmitter<Track>();

  @ViewChild('table') table: MatTable<Track>;

  displayedColumns: string[] = ['url', 'name', 'description', 'album', 'action']
  sortedTracks: any;
  constructor() {}

  ngOnInit() {
    this.sortedTracks=this.tracks.sort((a, b) => a.sortNumber < b.sortNumber ? -1 : a.sortNumber > b.sortNumber ? 1 : 0)
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

  dropTable(event: CdkDragDrop<Track[]>) {
    const prevIndex = this.sortedTracks.findIndex((d) => d === event.item.data);
    moveItemInArray(this.sortedTracks, prevIndex, event.currentIndex);
    let i=1;
    this.sortedTracks.forEach(element => {
      element['sortNumber']=i++;
      this.trackEditSortNumber.emit(element);
    });
    this.table.renderRows();
  }
}

