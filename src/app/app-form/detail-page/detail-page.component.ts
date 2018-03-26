import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  @Output() showList = new EventEmitter<boolean>();
  detailSelected = 'info';

  constructor() { }

  ngOnInit() {
  }

  onShowList() {
    this.showList.emit(false);
  }

  onDetailSelected($event) {
    this.detailSelected = $event;
  }

}
