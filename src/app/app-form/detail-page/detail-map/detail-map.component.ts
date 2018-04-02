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
  @ViewChild('inputHow') public inputHow: ElementRef;

  origin: any;
  destination: any;
  map: any;
  marker: any;
  directionsService: any;
  directionsDisplay: any;

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

    this.marker = new google.maps.Marker({
      position: this.destination,
      map: this.map,
    });

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      panel: this.detailmapPanel.nativeElement
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
    this.marker.setMap(null);
    let inputValue = this.inputFrom.nativeElement.value;
    let inputMode = this.inputHow.nativeElement.value.toUpperCase();
    let travelMode: any;
    if (inputMode === 'DRIVING') {
      travelMode = google.maps.TravelMode.DRIVING;
    } else if (inputMode === 'BICYCLING') {
      travelMode = google.maps.TravelMode.BICYCLING;
    } else if (inputMode === 'TRANSIT') {
      travelMode = google.maps.TravelMode.TRANSIT;
    } else if (inputMode === 'WALKING') {
      travelMode = google.maps.TravelMode.WALKING;
    }


    this.directionsService.route({
      origin: (inputValue.toLowerCase() === 'your location' || inputValue.toLowerCase() === 'my location') ? this.origin : inputValue,
      destination: this.destination,
      provideRouteAlternatives: true,
      travelMode: travelMode
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });


  }


}
