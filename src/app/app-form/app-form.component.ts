import {ElementRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LocationService} from './getlocation.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';

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
  searchStatus;
  isSubmit = false;
  hasDetail = false;

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
  feature = 'results'
  placeid: string;
  detailPlace;

  detailIcon;
  detailName;
  detailAddress;
  detailLat;
  detailLng;

  localStorageFormattedList;
  localStorageFormattedMap;


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

    this.onUpdateLocalStorage();
  }

  onClickSubmit() {
    this.state = 'table';
    this.detailPlace = null;
    this.isSubmit = true;
    this.searchResults = null;
    this.searchStatus = null;
    this.feature = 'results';
    this.loadedFeature = 'results';
    this.hasDetail = false;
    this.onSubmit();

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
    if (this.signupForm.value.searchData.locale === 'other') {
      this.data.localeOtherDetail = this.searchElementRef.nativeElement.value;
    } else {
      this.data.localeOtherDetail = '';
    }

    this.data.lat = this.currentLat;
    this.data.lng = this.currentLng;
    console.log(this.searchElementRef.nativeElement.value);
    console.log(this.data);
    this.locationService.searchPlaces(this.data)
      .subscribe(
        (response) => {
          console.log('getting search places - page 1');
          console.log(response);

          this.currentPage = 'page1';
          if (response['next_page_token']) {
            this.hasNext = true;
            this.dataPage2.token = response['next_page_token'];
          } else {
            this.hasNext = false;
          }

          this.searchResults = response['results'];
          this.searchStatus  = response['status'];
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
      searchData: {
        category: 'Default',
        locale: 'current',
        distance: ''
      }
    });
    this.state = 'table';
    this.loadedFeature = 'results';
    this.hasDetail = false;
    this.detailPlace = null;
    this.feature = 'results';
    this.isSubmit = false;
    this.searchResults = null;
    this.searchStatus = null;
  }

  onNavigate(feature: string) {
    this.hasDetail = false;
    this.loadedFeature = feature;
    this.feature = feature;
    this.state = 'table';
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
            this.searchStatus  = response['status'];
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
            this.searchStatus  = response['status'];
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
            this.searchStatus  = response['status'];
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
    this.placeid = detail.id;
    this.detailIcon = detail.icon;
    this.detailName = detail.name;
    this.detailAddress = detail.address;
    this.detailLat = detail.lat;
    this.detailLng = detail.lng;

    this.detailPlace = {
      'placeid': detail.id,
      'icon': detail.icon,
      'name': detail.name,
      'address': detail.address,
      'lat': detail.lat,
      'lng': detail.lng
    };
  }

  showList() {
    this.hasDetail = false;
    this.state = 'table';
  }

  onUpdateLocalStorage() {
    let dataMap = {};
    let dataList = [];
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let val = localStorage.getItem(key);
      dataList.push(JSON.parse(val));
      dataMap[key] = val;
    }

    dataList.sort((a, b) => {
      return a['time'] - b['time'];
    });
    this.localStorageFormattedList = dataList;
    this.localStorageFormattedMap = dataMap;
  }


}
