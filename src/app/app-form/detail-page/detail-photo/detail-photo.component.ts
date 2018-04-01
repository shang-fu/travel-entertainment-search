import {Component, Input, OnInit} from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-detail-photo',
  templateUrl: './detail-photo.component.html',
  styleUrls: ['./detail-photo.component.css']
})
export class DetailPhotoComponent implements OnInit {
  @Input() place: any;

  constructor() { }

  ngOnInit() {
    if (this.place.photos) {


      this.place.photos.forEach((photo) => {
        let image = photo.getUrl({maxWidth: photo.width});
        $('#detailphoto').append(`<div class="card">
<a href="${image}" target="_blank"><img class="img-thumbnail" src="${image}"></div></a>`);
      });

    } else {
      $('#detailphotoNoRecord').append(`<div class="alert alert-warning" role="alert">No records.</div>`);
    }
  }

}
