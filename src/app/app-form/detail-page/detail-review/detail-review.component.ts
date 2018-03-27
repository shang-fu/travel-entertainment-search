import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit {
  company = 'Google Review';
  order = 'Default Order';

  constructor() { }

  ngOnInit() {
  }


  onChangeReview(company: string) {
    this.company = company;
  }

  onChangeOrder(order: string) {
    this.order = order;
  }

}
