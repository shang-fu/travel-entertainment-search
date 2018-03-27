import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { } from 'googlemaps';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-place-table',
  templateUrl: './place-table.component.html',
  styleUrls: ['./place-table.component.css']
})
export class PlaceTableComponent implements OnInit {
  @Input() places: Object[];
  // @Input() hasDetail: boolean;
  @Input() hasNext: boolean;
  @Input() hasPrev: boolean;
  @Output() pageSelected = new EventEmitter<string>();
  @ViewChild('dummy') dummymap: ElementRef;
  @Output() hasDetail = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {

  }

  onPage(page: string) {
    this.pageSelected.emit(page);
  }

  // getDetail(placeid: string) {
  //   // console.log(placeid);
  //
  //   let service = new google.maps.places.PlacesService(new google.maps.Map(this.dummymap.nativeElement));
  //   // console.log(service);
  //
  //   service.getDetails({
  //     placeId: placeid
  //   }, function(place, status) {
  //     if (status === google.maps.places.PlacesServiceStatus.OK) {
  //       console.log(place);
  //
  //       if (place.name) {
  //         $('#detailheader').text(place.name);
  //       }
  //       if (place.formatted_address) {
  //         $('#detailaddress').text(place.formatted_address);
  //       }
  //       if (place.international_phone_number) {
  //         $('#detailphone').text(place.international_phone_number);
  //       }
  //       if (place.price_level) {
  //         if (place.price_level == 1) {
  //           $('#detailprice').text('$');
  //         } else if (place.price_level == 2) {
  //           $('#detailprice').text('$$');
  //         } else if (place.price_level == 3) {
  //           $('#detailprice').text('$$$');
  //         } else if (place.price_level == 4) {
  //           $('#detailprice').text('$$$$');
  //         }
  //       }
  //
  //       if (place.rating) {
  //         let rate = place.rating;
  //         if (rate == 1) {
  //           $('#detailrating').prepend(`1.0 `);
  //           $('#detail-star').addClass('stars-100');
  //         } else if (rate == 2) {
  //           $('#detailrating').prepend(`2.0 <span style="color: rgb(219, 115, 53)">★</span>`);
  //           $('#detail-star').addClass('stars-100');
  //         } else if (rate == 3) {
  //           $('#detailrating').prepend(`3.0 <span style="color: rgb(219, 115, 53)">★★</span>`);
  //           $('#detail-star').addClass('stars-100');
  //         } else if (rate == 4) {
  //           $('#detailrating').prepend(`4.0 <span style="color: rgb(219, 115, 53)">★★★</span>`);
  //           $('#detail-star').addClass('stars-100');
  //         } else if (rate == 5) {
  //           $('#detailrating').prepend(`4.0 <span style="color: rgb(219, 115, 53)">★★★★</span>`);
  //           $('#detail-star').addClass('stars-100');
  //         } else if (0 <= rate && rate < 1 ) {
  //           $('#detailrating').prepend(`${rate} `);
  //           $('#detail-star').addClass(`stars-${rate * 100}`);
  //         } else if (1 < rate && rate < 2 ) {
  //           $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★</span>`);
  //           $('#detail-star').addClass(`stars-${Math.round((rate - 1) * 100)}`);
  //         } else if (2 < rate && rate < 3 ) {
  //           $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★★</span>`);
  //           $('#detail-star').addClass(`stars-${Math.round((rate - 2) * 100)}`);
  //         } else if (3 < rate && rate < 4 ) {
  //           $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★★★</span>`);
  //           $('#detail-star').addClass(`stars-${Math.round((rate - 3) * 100)}`);
  //         } else if (4 < rate && rate < 5 ) {
  //           $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★★★★</span>`);
  //           $('#detail-star').addClass(`stars-${Math.round((rate - 4) * 100)}`);
  //         }
  //       }
  //
  //       if (place.url) {
  //         $('#detailgooglepage').html(`<a  href="${place.url}" target="_blank">${place.url}</a>`);
  //       }
  //       if (place.website) {
  //         $('#detailwebsite').html(`<a  href="${place.website}" target="_blank">${place.website}</a>`);
  //       }
  //
  //
  //
  //       // photos
  //       if (place.photos) {
  //         let image = place.photos[0].getUrl({maxWidth: place.photos[0].width});
  //         console.log(image);
  //         $('#detailphoto').append('test');
  //
  //       }
  //
  //
  //     }
  //   });
  //   this.hasDetail.emit(true);
  //
  //
  //
  //
  //
  // }

  getDetail(placeid: string) {
    this.hasDetail.emit(placeid);
  }
}
