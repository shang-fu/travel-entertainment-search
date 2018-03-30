import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { } from 'googlemaps';

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
  @Input() detailLat: number;
  @Input() detailLng: number;
  @Input() currentLat: number;
  @Input() currentLng: number;

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
}
