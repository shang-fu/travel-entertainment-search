import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { } from 'googlemaps';
import * as moment from 'moment';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  @Output() showList = new EventEmitter<boolean>();
  detailSelected = 'info';
  @Input() placeid: string;
  @Input() detailIcon: string;
  @Input() detailName: string;
  @Input() detailAddress: string;
  @Input() detailLat: number;
  @Input() detailLng: number;
  @Input() currentLat: number;
  @Input() currentLng: number;
  @Input() localStorageFormattedMap;
  @Output() localStorageChangeEvent = new EventEmitter<any>();

  place: any;

  constructor() {}

  ngOnInit() {
  }


  onShowList() {
    this.showList.emit();
  }

  onDetailSelected($event) {
    this.detailSelected = $event;
  }

  onSendPlace($event) {
    this.place = $event;
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
