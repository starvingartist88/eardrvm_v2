import { DemoMaterialModule } from './../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {
  ButtonsModule,
  InputsModule,
  CardsFreeModule,
  InputUtilitiesModule,
  IconsModule
} from 'angular-bootstrap-md';
import { TracksModalComponent } from './components/tracks-modal/tracks-modal.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { TracksListComponent } from './components/tracks-list/tracks-list.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    TracksModalComponent,
    ProjectModalComponent,
    ProjectsListComponent,
    ProjectComponent,
    TracksListComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    InputUtilitiesModule,
    IconsModule,
    FormsModule,
    ButtonsModule,
    CardsFreeModule,
    DemoMaterialModule
  ],
  exports: [ProjectsListComponent, ProjectComponent, TracksListComponent],
  providers: [],
  entryComponents: [
    ConfirmModalComponent,
    TracksModalComponent,
    ProjectModalComponent
  ]
})
export class SharedModule {}
