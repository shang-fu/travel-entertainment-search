import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-detail-popup-hours',
  templateUrl: './detail-popup-hours.component.html',
  styleUrls: ['./detail-popup-hours.component.css']
})
export class DetailPopupHoursComponent implements OnInit {
  @Input() localDayToNum;
  @Input() weekDay;

  constructor() { }

  ngOnInit() {
    console.log(this.weekDay);
  }

}
