import {ElementRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LocationService} from './getlocation.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css'],
  animations: [
    trigger('detailState', [
      state('table', style({
        transform: 'translateX(-100%)'
      })),
      state('detail', style({
        transform: 'translateX(0)'
      })),
      transition('table => detail', animate(600)),
      // transition('detail => table', animate(1000))
    ]),
    trigger('tableState', [
      state('table', style({
        transform: 'translateX(0)'
      })),
      state('detail', style({
        transform: 'translateX(100%)'
      })),
      // transition('table => detail', animate(1000)),
      transition('detail => table', animate(600))
    ]),
  ]
})
export class AppFormComponent implements OnInit {
  state = 'table';

  @ViewChild('f') signupForm: NgForm;
  @ViewChild('searchElement') searchElementRef: ElementRef;


  defaultCategory = 'Default';
  defaultLocale = 'current';
  currentLat;
  currentLng;

  currentPage;
  // nexPageToken;
  searchResults;
  isSubmit = false;
  hasDetail = false;
  detailLat;
  detailLng;
  hasNext = false;
  hasPrev = false;

  // for page 1
  data = {
    keyword: '',
    category: '',
    distance: '',
    locale: '',
    localeOtherDetail: '',
    lat: '',
    lng: ''
  };
  // for page 2
  dataPage2 = {
    token: ''
  };
  // for page 3
  dataPage3 = {
    token: ''
  };

  loadedFeature = 'results';
  placeid: string;


  constructor(private mapsAPILoader: MapsAPILoader, private locationService: LocationService) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      console.log(this.signupForm);
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
    });

    this.locationService.getLocation()
      .subscribe(
        (response) => {
          console.log('current location: ');
          console.log(response);
          this.currentLat = response['lat'];
          this.currentLng = response['lon'];
        },
        (error) => {
          console.log('find user location not work')
          console.log(error);
        }
      );
  }

  onSubmit() {
    // console.log(this.signupForm);
    this.data.keyword = this.signupForm.value.searchData.keyword;
    this.data.category = this.signupForm.value.searchData.category;
    if (this.signupForm.value.searchData.distance === '') {
      this.data.distance = '10';
    } else {
      this.data.distance = this.signupForm.value.searchData.distance;
    }
    this.data.locale = this.signupForm.value.searchData.locale;
    if (this.signupForm.value.searchData.locale == 'other') {
      this.data.localeOtherDetail = this.signupForm.value.searchData.localeOtherDetail;
    } else {
      this.data.localeOtherDetail = '';
    }

    this.data.lat = this.currentLat;
    this.data.lng = this.currentLng;
    this.locationService.searchPlaces(this.data)
      .subscribe(
        (response) => {
          console.log('getting search places - page 1');
          console.log(response);
          this.isSubmit = true;
          this.currentPage = 'page1';
          if (response['next_page_token']) {
            this.hasNext = true;
            this.dataPage2.token = response['next_page_token'];
          } else {
            this.hasNext = false;
          }

          this.searchResults = response['results'];
          // console.log(this.nexPageToken);
          // console.log(this.searchResults);

        },
        (error) => {
          console.log('search places not work')
          console.log(error);
        }
      );

  }

  onClear() {
    this.signupForm.reset({
      searchData:{
        category: 'Default',
        locale: 'current'
      }
    });
    // this.defaultCategory = 'Default';
    // this.defaultLocale = 'current';
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  onPage(page: string) {
    if (this.currentPage === 'page2' && page === 'previous') {
      this.locationService.searchPlaces(this.data)
        .subscribe(
          (response) => {
            console.log('getting search places - page 1');
            console.log(response);
            if (response['next_page_token']) {
              this.hasNext = true;
              this.dataPage2.token = response['next_page_token'];
            } else {
              this.hasNext = false;
            }
            this.searchResults = response['results'];
            this.hasPrev = false;
            this.currentPage = 'page1';
          },
          (error) => {
            console.log('search places not work')
            console.log(error);
          }
        );

    } else if ((this.currentPage === 'page1' && page === 'next') ||
               (this.currentPage === 'page3' && page === 'previous')) {
      this.locationService.searchPlaces(this.dataPage2)
        .subscribe(
          (response) => {
            console.log('getting search places - page 2');
            console.log(response);
            if (response['next_page_token']) {
              this.hasNext = true;
              this.dataPage3.token = response['next_page_token'];
            } else {
              this.hasNext = false;
            }
            this.searchResults = response['results'];
            this.hasPrev = true;
            this.currentPage = 'page2';
          },
          (error) => {
            console.log('search places not work')
            console.log(error);
          }
        );
    } else if (this.currentPage === 'page2' && page === 'next') {
      this.locationService.searchPlaces(this.dataPage3)
        .subscribe(
          (response) => {
            console.log('getting search places - page 3');
            console.log(response);
            if (response['next_page_token']) {
              this.hasNext = true;
              // this.dataPage3.token = response['next_page_token'];
            } else {
              this.hasNext = false;
            }
            this.searchResults = response['results'];
            this.hasPrev = true;
            this.currentPage = 'page3';
          },
          (error) => {
            console.log('search places not work')
            console.log(error);
          }
        );
    }
  }

  onHasDetail(detail: any) {
    this.hasDetail = true;
    this.state = 'detail';
    this.placeid = detail.placeid;
    this.detailLat = detail.lat;
    this.detailLng = detail.lng;
  }

  showList() {
    this.hasDetail = false;
    this.state = 'table';
  }


}
