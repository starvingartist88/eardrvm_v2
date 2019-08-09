import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DemoMaterialModule} from './material-module';


import { AngularFireModule } from '@angular/fire';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ModalModule } from 'angular-bootstrap-md';
import { MyFireService } from './shared/myfire.service';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { UserService } from './shared/user.service';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FollowingComponent } from './following/following.component';


@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    MyPostsComponent,
    AllPostsComponent,
    FavoritesComponent,
    FollowingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    DemoMaterialModule,
    AuthModule,
    SharedModule,
    ModalModule.forRoot(),
    AdminModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    CoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([])
  ],
  providers: [MyFireService, NotificationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
