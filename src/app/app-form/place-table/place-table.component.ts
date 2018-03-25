import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { } from 'googlemaps';


@Component({
  selector: 'app-place-table',
  templateUrl: './place-table.component.html',
  styleUrls: ['./place-table.component.css']
})
export class PlaceTableComponent implements OnInit {
  @Input() places: Object[];
  @Input() hasDetail: boolean;
  @Input() hasNext: boolean;
  @Input() hasPrev: boolean;
  @Output() pageSelected = new EventEmitter<string>();
  @ViewChild('dummy') dummymap: ElementRef;

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
      }
    });




  }
}
