import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LocationService} from './getlocation.service';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  defaultCategory = 'Default';
  defaultLocale = 'current';
  currentLat;
  currentLng;
  nexPageToken;
  searchResults;
  isSubmit = false;

  data = {
    keyword: '',
    category: '',
    distance: '',
    locale: '',
    localeOtherDetail: ''
  };

  loadedFeature = 'results';


  constructor(private locationService: LocationService) { }

  ngOnInit() {
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

    this.locationService.searchPlaces(this.data, this.currentLat, this.currentLng)
      .subscribe(
        (response) => {
          console.log('getting search places');
          console.log(response);
          this.isSubmit = true;
          this.nexPageToken = response['next_page_token'];
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

}
