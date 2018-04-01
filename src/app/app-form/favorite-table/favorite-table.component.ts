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

  hasNextPage;
  hasPrevPage;
  startIndex;

  constructor() { }

  ngOnInit() {
    this.startIndex = 0;
    this.hasPrevPage = false;
    if (this.localStorageFormattedList.length > 20) {
      this.hasNextPage = true;
    } else {
      this.hasNextPage = false;
    }
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

    setTimeout(() => {
      if (this.startIndex >= this.localStorageFormattedList.length) {
        this.startIndex -= 20;
        if (this.startIndex <= 0 ) {
          this.hasPrevPage = false;
        } else {
          this.hasPrevPage = true;
        }
        this.hasNextPage = false;
      } else {
        if (this.startIndex + 20 >= this.localStorageFormattedList.length) {
          this.hasNextPage = false;
        } else {
          this.hasNextPage = true;
        }
      }
    }, 300);
  }

  onShowNextPage() {
    this.startIndex += 20;
    this.hasPrevPage = true;

    if (this.startIndex + 20 >= this.localStorageFormattedList.length) {
      this.hasNextPage = false;
    } else {
      this.hasNextPage = true;
    }
  }

  onShowPrevPage() {
    this.startIndex -= 20;
    if (this.startIndex <= 0 ) {
      this.hasPrevPage = false;
    } else {
      this.hasPrevPage = true;
    }

    if (this.startIndex + 20 >= this.localStorageFormattedList.length) {
      this.hasNextPage = false;
    } else {
      this.hasNextPage = true;
    }

  }

}
