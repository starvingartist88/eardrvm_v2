import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { Track } from "../../../tracks/models/track.model";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatTable } from "@angular/material/table";

@Component({
  selector: "app-tracks-list",
  templateUrl: "./tracks-list.component.html",
  styleUrls: ["./tracks-list.component.scss"]
})
export class TracksListComponent implements OnInit {
  @Input() tracks: Track[];
  @Output() trackDeleted = new EventEmitter<Track>();
  @Output() trackEdited = new EventEmitter<Track>();
  @Output() trackEditSortNumber = new EventEmitter<Track>();

  @ViewChild("table") table: MatTable<Track>;

  displayedColumns: string[] = [
    "url",
    "name",
    "description",
    "album",
    "action"
  ];
  // sortedTracks: any;
  constructor() {}

  ngOnInit() {}

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
    const prevIndex = this.tracks.findIndex(d => d === event.item.data);
    moveItemInArray(this.tracks, prevIndex, event.currentIndex);
    this.table.renderRows();

    let i = 1;
    this.tracks.forEach(element => {
      element["sortNumber"] = i++;
      this.trackEditSortNumber.emit(element);
    });
  }
}
