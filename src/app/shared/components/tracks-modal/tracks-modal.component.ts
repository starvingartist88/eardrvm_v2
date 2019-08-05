import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Track } from '../../../tracks/models/track.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tracks-modal',
  templateUrl: './tracks-modal.component.html',
  styleUrls: ['./tracks-modal.component.scss']
})
export class TracksModalComponent implements OnInit {
  @ViewChild('trackForm') trackForm: NgForm;

  heading: string;
  track: Track = {};

  trackData: Subject<Track> = new Subject();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  onSave() {
    if (this.trackForm.valid) {
      this.trackData.next(this.track);
    this.modalRef.hide();
    } else {
      const controls = this.trackForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }

}
