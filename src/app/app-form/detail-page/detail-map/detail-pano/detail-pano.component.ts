import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'app-detail-pano',
  templateUrl: './detail-pano.component.html',
  styleUrls: ['./detail-pano.component.css']
})
export class DetailPanoComponent implements OnInit {
  @ViewChild('detailPano') public detailPano: ElementRef;
  @Input() location: any;

  constructor() { }

  ngOnInit() {

    let panorama = new google.maps.StreetViewPanorama(
      this.detailPano.nativeElement, {
        position: this.location,
        pov: {
          heading: 34,
          pitch: 10
        }
      });


  }

}
