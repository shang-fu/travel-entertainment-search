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
  @Input() currentLat: any;
  @Input() currentLng: any;
  @ViewChild('inputFrom') public inputFrom: ElementRef;
  @ViewChild('detailMap') public detailMap: ElementRef;
  @ViewChild('detailmapPanel') public detailmapPanel: ElementRef;

  origin: any;
  destination: any;
  map: any;

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

    this.origin = {lat: this.currentLat, lng: this.currentLng};
    this.destination = {lat: this.detailLat, lng: this.detailLng};



    this.map = new google.maps.Map(this.detailMap.nativeElement, {
      center: this.destination,
      zoom: 12
    });

    let marker = new google.maps.Marker({
      position: this.destination,
      map: this.map,
    });


  }

  onSelectView() {
    if (this.view === 'map') {
      this.view = 'street';
    } else if (this.view === 'street') {
      this.view = 'map';
    }
  }

  onDisplayRoute() {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      panel: this.detailmapPanel.nativeElement
    });

    directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });


  }


}
