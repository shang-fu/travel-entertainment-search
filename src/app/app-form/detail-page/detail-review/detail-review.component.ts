import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {YelpService} from './yelp.service';
import * as moment from 'moment';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css'],
  animations: [
    trigger('googleState', [
      state('google', style({
        opacity: 1,
      })),
      state('yelp', style({
        opacity: 0,
      })),
      transition('google => yelp', animate(200)),
      transition('yelp => google', animate(1000))
    ]),
    trigger('yelpState', [
      state('google', style({
        opacity: 0,
      })),
      state('yelp', style({
        opacity: 1,
      })),
      transition('google => yelp', animate(1000)),
      transition('yelp => google', animate(200))
    ]),
  ]
})
export class DetailReviewComponent implements OnInit {
  company = 'Google Reviews';
  order = 'Default Order';
  @Input() place: any;
  googleReviews: Array<any>;
  yelpReviews: Array<any>;
  yelpReviewsOriginal: Array<any>;
  inUSA = true;
  state = 'google';

  constructor(private yelp: YelpService) { }

  ngOnInit() {
    this.googleReviews = this.place.reviews;
    // console.log(this.googleReviews);


    const yelpAddress = this.place.formatted_address.split(', ');
    console.log(yelpAddress);
    if (yelpAddress[yelpAddress.length - 1] !== 'USA') {
      this.inUSA = false;
    }
    if (this.inUSA === true) {
      let address1 = '';
      for (let i = 0; i < yelpAddress.length - 3; i++) {
        address1 += yelpAddress[i] + ', ';
      }
      address1 = address1.slice(0, -2);
      const yelpRequest = {
        name: this.place.name,
        address1: address1,
        address2: yelpAddress[yelpAddress.length - 3],
        address3: yelpAddress[yelpAddress.length - 2],
        city: yelpAddress[yelpAddress.length - 3],
        state: yelpAddress[yelpAddress.length - 2].split(' ')[0],
        country: 'US'
      };

      this.yelp.getReviews(yelpRequest)
        .subscribe((response) => {
          console.log('yelp reviews...');
          console.log(response);
          console.log(response['reviews']);
          this.yelpReviewsOriginal = response['reviews'];
          this.yelpReviews = JSON.parse(JSON.stringify(response['reviews']));
        }, (error) => {
          console.log('find yelp reviews not work')
          console.log(error);
        });
    }



  }


  onChangeReview(company: string) {
    this.company = company;
    if (this.company === 'Google Reviews') {
      this.state = 'google';
    } else if (this.company === 'Yelp Reviews') {
      this.state = 'yelp';
    }
    this.sortReviews();
  }

  onChangeOrder(order: string) {
    this.order = order;
    this.sortReviews();

  }

  sortReviews() {
    if (this.order === 'Default Order') {
      if (this.googleReviews !== null && this.googleReviews !== undefined) {
        this.googleReviews = this.place.reviews;
      }
      if (this.inUSA === true && this.yelpReviews !== null && this.yelpReviews !== undefined) {
        this.yelpReviews = JSON.parse(JSON.stringify(this.yelpReviewsOriginal));
        console.log(this.yelpReviews);
        console.log(this.yelpReviewsOriginal);
      }
    } else if (this.order === 'Most Recent') {
      if (this.googleReviews !== null && this.googleReviews !== undefined) {
        this.googleReviews.sort((a, b) => {
          return b.time - a.time;
        });
      }
      if (this.inUSA === true && this.yelpReviews !== null && this.yelpReviews !== undefined) {
        this.yelpReviews.sort((a, b) => {
          return Number(moment(b['time_created']).format('x')) - Number(moment(a['time_created']).format('x'));
        });
      }
    } else if (this.order === 'Least Recent') {
      if (this.googleReviews !== null && this.googleReviews !== undefined) {
        this.googleReviews.sort((a, b) => {
          return a.time - b.time;
        });
      }
      if (this.inUSA === true && this.yelpReviews !== null && this.yelpReviews !== undefined) {
        this.yelpReviews.sort((a, b) => {
          return Number(moment(a['time_created']).format('x')) - Number(moment(b['time_created']).format('x'));
        });
      }
    } else if (this.order === 'Highest Rating') {
      if (this.googleReviews !== null && this.googleReviews !== undefined) {
        this.googleReviews.sort((a, b) => {
          return b.rating - a.rating;
        });
      }
      if (this.inUSA === true && this.yelpReviews !== null && this.yelpReviews !== undefined) {
        this.yelpReviews.sort((a, b) => {
          return b.rating - a.rating;
        });
      }
    } else if (this.order === 'Lowest Rating') {
      if (this.googleReviews !== null && this.googleReviews !== undefined) {
        this.googleReviews.sort((a, b) => {
          return a.rating - b.rating;
        });
      }
      if (this.inUSA === true && this.yelpReviews !== null && this.yelpReviews !== undefined) {
        this.yelpReviews.sort((a, b) => {
          return a.rating - b.rating;
        });
      }
    }


  }

}
