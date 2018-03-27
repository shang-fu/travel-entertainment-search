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
      // let image = this.place.photos[0].getUrl({maxWidth: this.place.photos[0].width});
      // console.log(image);
      // $('#detailphoto').append(`<div class="card"><img class="img-thumbnail" src="${image}"></div>`);

      this.place.photos.forEach((photo) => {
        let image = photo.getUrl({maxWidth: photo.width});
        $('#detailphoto').append(`<div class="card">
<a href="${image}" target="_blank"><img class="img-thumbnail" src="${image}"></div></a>`);
      });

    }
  }

}
