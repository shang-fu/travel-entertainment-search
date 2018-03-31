import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-favorite-table',
  templateUrl: './favorite-table.component.html',
  styleUrls: ['./favorite-table.component.css']
})
export class FavoriteTableComponent implements OnInit {
  @Input() detailPlace;
  @Input() localStorageFormattedList;
  @Output() localStorageChangeEvent = new EventEmitter<any>();
  @Output() hasDetail = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
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

  onFavRemove(placeid: string) {
    localStorage.removeItem(placeid);
    this.localStorageChangeEvent.emit();
  }

}
