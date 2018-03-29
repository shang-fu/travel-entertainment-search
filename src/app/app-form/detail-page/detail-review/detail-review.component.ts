import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit {
  company = 'Google Reviews';
  order = 'Default Order';
  @Input() place: any;
  googleReviews: Array<any>;
  yelpReviews: Array<any>;
  yelpReviewsOriginal: Array<any>;

  constructor() { }

  ngOnInit() {
    this.googleReviews = this.place.reviews;
    // let temp_array = [];
    // for (let i = 1; i < this.place.reviews.length; i++) {
    //   let data = {
    //     name: this.place.reviews[i].author_name,
    //     url: this.place.reviews[i].author_url,
    //     photo: this.place.reviews[i].profile_photo_url,
    //     rate: this.place.reviews[i].rating,
    //     text: this.place.reviews[i].text,
    //     time: this.place.reviews[i].time,
    //     formatted_time: new Date(1522729800000)
    //   };
    //   temp_array.push(data);
    // }
    // this.googleReviews = temp_array;
    console.log(this.googleReviews);
  }


  onChangeReview(company: string) {
    this.company = company;
    this.sortReviews();
  }

  onChangeOrder(order: string) {
    this.order = order;
    this.sortReviews();

  }

  sortReviews() {
    if (this.order === 'Default Order') {
      this.googleReviews = this.place.reviews;
      // this.yelpReviews = this.yelpReviewsOriginal;
    } else if (this.order === 'Most Recent') {
      this.googleReviews.sort((a, b) => {
        return b.time - a.time;
      });
      // this.yelpReviews.sort((a, b) => {
      //   return b.time - a.time;
      // });
    } else if (this.order === 'Least Recent') {
      this.googleReviews.sort((a, b) => {
        return a.time - b.time;
      });
      // this.yelpReviews.sort((a, b) => {
      //   return b.time - a.time;
      // });
    } else if (this.order === 'Highest Rating') {
      this.googleReviews.sort((a, b) => {
        return b.rating - a.rating;
      });
      // this.yelpReviews.sort((a, b) => {
      //   return b.rating - a.rating;
      // });
    } else if (this.order === 'Lowest Rating') {
      this.googleReviews.sort((a, b) => {
        return a.rating - b.rating;
      });
      // this.yelpReviews.sort((a, b) => {
      //   return b.rating - a.rating;
      // });
    }


  }

}
