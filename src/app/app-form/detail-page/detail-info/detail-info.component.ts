import {Component, Input, OnInit} from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit {
  @Input() place: any;
  detailaddress;
  detailphone;
  detailprice;

  constructor() { }

  ngOnInit() {
    if (this.place) {
      if (this.place.formatted_address) {
        this.detailaddress = this.place.formatted_address;
      }
      if (this.place.international_phone_number) {
        this.detailphone = this.place.international_phone_number;
      }

      if (this.place.price_level) {
        if (this.place.price_level == 1) {
          this.detailprice = '$';
        } else if (this.place.price_level == 2) {
          this.detailprice = '$$';
        } else if (this.place.price_level == 3) {
          this.detailprice = '$$$';
        } else if (this.place.price_level == 4) {
          this.detailprice = '$$$$';
        }
      }

      if (this.place.rating) {
        let rate = this.place.rating;
        if (rate == 1) {
          $('#detailrating').prepend(`1.0 `);
          $('#detail-star').addClass('stars-100');
        } else if (rate == 2) {
          $('#detailrating').prepend(`2.0 <span style="color: rgb(219, 115, 53)">★</span>`);
          $('#detail-star').addClass('stars-100');
        } else if (rate == 3) {
          $('#detailrating').prepend(`3.0 <span style="color: rgb(219, 115, 53)">★★</span>`);
          $('#detail-star').addClass('stars-100');
        } else if (rate == 4) {
          $('#detailrating').prepend(`4.0 <span style="color: rgb(219, 115, 53)">★★★</span>`);
          $('#detail-star').addClass('stars-100');
        } else if (rate == 5) {
          $('#detailrating').prepend(`4.0 <span style="color: rgb(219, 115, 53)">★★★★</span>`);
          $('#detail-star').addClass('stars-100');
        } else if (0 <= rate && rate < 1 ) {
          $('#detailrating').prepend(`${rate} `);
          $('#detail-star').addClass(`stars-${rate * 100}`);
        } else if (1 < rate && rate < 2 ) {
          $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★</span>`);
          $('#detail-star').addClass(`stars-${Math.round((rate - 1) * 100)}`);
        } else if (2 < rate && rate < 3 ) {
          $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★★</span>`);
          $('#detail-star').addClass(`stars-${Math.round((rate - 2) * 100)}`);
        } else if (3 < rate && rate < 4 ) {
          $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★★★</span>`);
          $('#detail-star').addClass(`stars-${Math.round((rate - 3) * 100)}`);
        } else if (4 < rate && rate < 5 ) {
          $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★★★★</span>`);
          $('#detail-star').addClass(`stars-${Math.round((rate - 4) * 100)}`);
        }

      }

      if (this.place.url) {
        $('#detailgooglepage').html(`<a  href="${this.place.url}" target="_blank">${this.place.url}</a>`);
      }
      if (this.place.website) {
        $('#detailwebsite').html(`<a  href="${this.place.website}" target="_blank">${this.place.website}</a>`);
      }




    }
  }

}
