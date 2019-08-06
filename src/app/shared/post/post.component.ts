import { Component, OnInit, Input, Output } from '@angular/core';
import * as firebase from 'firebase';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() imageName: string;
  @Input() displayPostedBy: boolean = true;
  @Input() displayFavoritesButton: boolean = true;
  @Input() displayFollowButton: boolean = true;

  defaultImage: string = "http://via.placeholder.com/150x150";
  imageData: any = {};

  @Output() favoriteClicked = new EventEmitter<any>();
  @Output() followClicked = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;

    firebase.database().ref('images').child(this.imageName)
    .once('value')
    .then(_snapshot => {
      this.imageData = _snapshot.val(); 
      this.defaultImage = this.imageData.fileUrl;

      if (this.imageData.uploadedBy.uid === uid) {
        this.displayFavoritesButton = false;
        this.displayFollowButton = false;
      }
    });

  }

  onFavoritesClicked() {
    this.favoriteClicked.emit(this.imageData);
  }

  onFollowClicked() {
    this.followClicked.emit(this.imageData);
  }

}
