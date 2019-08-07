import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Project } from '../../../projects/models/project.model';
import { NgForm } from '@angular/forms';
import { MyFireService } from '../../myfire.service';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  @ViewChild('projectForm') projectForm: NgForm;

  heading: string;

  title: string;
  description: string;
  imageUrl: string;
  audioUrl: string;

  projectData: Subject<Project> = new Subject();
  project: Project = {};

  constructor(public modalRef: MDBModalRef, private myFire: MyFireService, private _notifier: NotificationService) {}

  ngOnInit() { }

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file)
        .then(({fileUrl})=> {
          this.project.imageUrl = fileUrl
          this._notifier.display('success', 'Image Successfully Uploaded. Please Save!'!)
        }); 
    }
    
  }

  onFileSelection2(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file)
        .then(({fileUrl})=> {
          this.project.audioUrl = fileUrl
          this._notifier.display('success', 'Sound Successfully Uploaded. Please Save!'!)
        }); 
    }
    
  }

  onSave() {
    if (this.projectForm.valid) {
      this.projectData.next(this.project);
    this.modalRef.hide();
    } else {
      const controls = this.projectForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }

}
