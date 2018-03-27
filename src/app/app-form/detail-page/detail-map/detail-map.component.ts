import {Component, Input, OnInit} from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-detail-map',
  templateUrl: './detail-map.component.html',
  styleUrls: ['./detail-map.component.css']
})
export class DetailMapComponent implements OnInit {
  @Input() place: any;
  detailname
  detailaddress;

  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor() { }

  ngOnInit() {
    this.detailname = this.place.name;
    this.detailaddress = this.place.formatted_address;

    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

  }

}
