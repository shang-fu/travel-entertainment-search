import {Component, Input, OnInit} from '@angular/core';
import { Place } from '../place.model';

@Component({
  selector: 'app-place-table',
  templateUrl: './place-table.component.html',
  styleUrls: ['./place-table.component.css']
})
export class PlaceTableComponent implements OnInit {
  @Input() places: Object[];

  constructor() { }

  ngOnInit() {
  }

}
