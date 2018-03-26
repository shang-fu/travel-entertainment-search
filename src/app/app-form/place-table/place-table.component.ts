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
  @Output() hasDetail = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {

  }

  onPage(page: string) {
    this.pageSelected.emit(page);
  }

  getDetail(placeid: string) {
    // console.log(placeid);

    let service = new google.maps.places.PlacesService(new google.maps.Map(this.dummymap.nativeElement));
    // console.log(service);

    service.getDetails({
      placeId: placeid
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(place);

        if (place.name) {
          $('#detailheader').text(place.name);
        }
        if (place.formatted_address) {
          $('#detailaddress').text(place.formatted_address);
        }
        if (place.international_phone_number) {
          $('#detailphone').text(place.international_phone_number);
        }
        if (place.price_level) {
          if (place.price_level == 1) {
            $('#detailprice').text('$');
          } else if (place.price_level == 2) {
            $('#detailprice').text('$$');
          } else if (place.price_level == 3) {
            $('#detailprice').text('$$$');
          } else if (place.price_level == 4) {
            $('#detailprice').text('$$$$');
          }
        }
        if (place.url) {
          $('#detailgooglepage').html(`<a  href="${place.url}" target="_blank">${place.url}</a>`);
        }
        if (place.website) {
          $('#detailwebsite').html(`<a  href="${place.website}" target="_blank">${place.website}</a>`);
        }
      }
    });
    this.hasDetail.emit(true);




  }
}
