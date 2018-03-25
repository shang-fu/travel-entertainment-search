import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { } from 'googlemaps';


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
        document.getElementById('detailheader').innerText =  place.name;
        document.getElementById('detailaddress').innerText =  place.formatted_address;
        document.getElementById('detailphone').innerText =  place.international_phone_number;
        // document.getElementById('detailprice').innerHTML =  place.price_level;
        // document.getElementById('detailrating').innerHTML =  place.rating;
        document.getElementById('detailgooglepage').innerHTML =  `<a  href="${place.url}" target="_blank">${place.url}</a>`;
        document.getElementById('detailwebsite').innerHTML =  `<a  href="${place.website}" target="_blank">${place.website}</a>`;

      }
    });
    this.hasDetail.emit(true);




  }
}
