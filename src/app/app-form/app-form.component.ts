import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  defaultCategory = 'Default';
  defaultLocale = 'current';

  data = {
    keyword: '',
    category: '',
    distance: '',
    locale: '',
    localeOtherDetail: ''
  };

  constructor() { }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.signupForm);
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

}
