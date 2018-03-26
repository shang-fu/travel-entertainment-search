import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.css']
})
export class DetailHeaderComponent implements OnInit {
  headerstate = 'info';
  @Output() detailSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(hstate: string) {
    this.headerstate = hstate;
    this.detailSelected.emit(hstate);
  }

}
