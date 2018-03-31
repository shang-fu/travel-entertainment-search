import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  getDetail(placeid: string, lat: number, lng: number) {
    this.hasDetail.emit({'placeid': placeid, 'lat': lat, 'lng': lng});
  }

  onFavRemove(placeid: string) {
    localStorage.removeItem(placeid);
    this.localStorageChangeEvent.emit();
  }

}
