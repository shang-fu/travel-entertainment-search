import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { } from 'googlemaps';
import * as moment from 'moment';

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
  @Output() hasDetail = new EventEmitter<any>();
  @Input() detailPlace;
  @Input() localStorageFormattedMap;
  @Output() localStorageChangeEvent = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {

  }

  onPage(page: string) {
    this.pageSelected.emit(page);
  }

  getDetail(placeid: string, icon: string, name: string, address: string, lat: number, lng: number) {
    this.hasDetail.emit({
      'id': placeid,
      'icon': icon,
      'name': name,
      'address': address,
      'lat': lat,
      'lng': lng
    });
  }

  onFavSave(placeid: string, icon: string, name: string, address: string, lat: number, lng: number) {
    localStorage.setItem(placeid, JSON.stringify({
      'id': placeid,
      'icon': icon,
      'name': name,
      'address': address,
      'lat': lat,
      'lng': lng,
      'time': moment().format('x')
    }));
    this.localStorageChangeEvent.emit();
  }

  onFavRemove(placeid: string) {
    localStorage.removeItem(placeid);
    this.localStorageChangeEvent.emit();
  }

}
