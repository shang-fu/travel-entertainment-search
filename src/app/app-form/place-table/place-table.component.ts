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

        $('#detailheader').text(place.name);
        $('#detailaddress').text(place.formatted_address);
        $('#detailphone').text(place.international_phone_number);
        $('#detailgooglepage').html(`<a  href="${place.url}" target="_blank">${place.url}</a>`);
        $('#detailwebsite').html(`<a  href="${place.website}" target="_blank">${place.website}</a>`);
      }
    });
    this.hasDetail.emit(true);




  }
}
