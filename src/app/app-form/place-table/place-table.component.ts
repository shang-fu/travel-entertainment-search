import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Place } from '../place.model';

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

  constructor() { }

  ngOnInit() {
  }

  onPage(page: string) {
    this.pageSelected.emit(page);
  }
}
