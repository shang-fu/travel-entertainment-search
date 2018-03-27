import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-map',
  templateUrl: './detail-map.component.html',
  styleUrls: ['./detail-map.component.css']
})
export class DetailMapComponent implements OnInit {
  @Input() place: any;

  constructor() { }

  ngOnInit() {
  }

}
