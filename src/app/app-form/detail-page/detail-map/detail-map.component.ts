import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-detail-map',
  templateUrl: './detail-map.component.html',
  styleUrls: ['./detail-map.component.css']
})
export class DetailMapComponent implements OnInit {
  @Input() place: any;
  @Input() detailLat: any;
  @Input() detailLng: any;
  @ViewChild('inputFrom') public inputFrom: ElementRef;
  @ViewChild('detailMap') public detailMap: ElementRef;
  location: any;

  detailname
  detailaddress;
  view = 'map';

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

    let autocomplete = new google.maps.places.Autocomplete(this.inputFrom.nativeElement, {
      types: ["address"]
    });

    this.location = {lat: this.detailLat, lng: this.detailLng};



    let map = new google.maps.Map(this.detailMap.nativeElement, {
      center: this.location,
      zoom: 12
    });

    let marker = new google.maps.Marker({
      position: this.location,
      map: map,
    });


    // let panorama = new google.maps.StreetViewPanorama(
    //   this.detailPano.nativeElement, {
    //     position: location,
    //     pov: {
    //       heading: 34,
    //       pitch: 10
    //     }
    //   });
    // // map.setStreetView(panorama);

  }

  onSelectView() {

    if (this.view === 'map') {
      this.view = 'street';




    } else if (this.view === 'street') {
      this.view = 'map';


    }
  }

}
