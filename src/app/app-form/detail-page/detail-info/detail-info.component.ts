import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
declare var jquery: any;
declare var $: any;
import * as moment from 'moment';


@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit {
  place: any;
  @Output() sendPlace = new EventEmitter<any>();
  @Input() placeid: string;
  @ViewChild('dummy') dummymap: ElementRef;
  localDayToNum;
  weekDay;

  constructor() { }

  ngOnInit() {


    let service = new google.maps.places.PlacesService(new google.maps.Map(this.dummymap.nativeElement));
    // console.log(service);

    service.getDetails({
      placeId: this.placeid
    }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(place);
        this.place = place;
        this.sendPlace.emit(this.place);


        if (this.place != undefined) {
          if (this.place.formatted_address != undefined) {
            $('#detailaddress').text(this.place.formatted_address);
          } else {
            $('#detailaddress-row').remove();
          }
          if (this.place.international_phone_number != undefined) {
            $('#detailphone').text(this.place.international_phone_number);
          } else {
            $('#detailphone-row').remove();
          }


          if (this.place.price_level != undefined) {
            if (this.place.price_level == 1) {
              $('#detailprice').text('$');
            } else if (this.place.price_level == 2) {
              $('#detailprice').text('$');
            } else if (this.place.price_level == 3) {
              $('#detailprice').text('$');
            } else if (this.place.price_level == 4) {
              $('#detailprice').text('$');
            }
          } else {
            $('#detailprice-row').remove();
          }

          if (this.place.rating != undefined) {
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
            } else if (0 <= rate && rate < 1) {
              $('#detailrating').prepend(`${rate} `);
              $('#detail-star').addClass(`stars-${rate * 100}`);
            } else if (1 < rate && rate < 2) {
              $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★</span>`);
              $('#detail-star').addClass(`stars-${Math.round((rate - 1) * 100)}`);
            } else if (2 < rate && rate < 3) {
              $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★★</span>`);
              $('#detail-star').addClass(`stars-${Math.round((rate - 2) * 100)}`);
            } else if (3 < rate && rate < 4) {
              $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★★★</span>`);
              $('#detail-star').addClass(`stars-${Math.round((rate - 3) * 100)}`);
            } else if (4 < rate && rate < 5) {
              $('#detailrating').prepend(`${rate} <span style="color: rgb(219, 115, 53)">★★★★</span>`);
              $('#detail-star').addClass(`stars-${Math.round((rate - 4) * 100)}`);
            }

          } else {
            $('#detailrating-row').remove();
          }

          if (this.place.url != undefined) {
            $('#detailgooglepage').html(`<a  href="${this.place.url}" target="_blank">${this.place.url}</a>`);
          } else {
            $('#detailgooglepage-row').remove();
          }


          if (this.place.website != undefined) {
            $('#detailwebsite').html(`<a  href="${this.place.website}" target="_blank">${this.place.website}</a>`);
          } else {
            $('#detailwebsite-row').remove();
          }

          if (this.place.opening_hours != undefined) {
            const targetHoursData = this.place.opening_hours;
            // const periods = targetHoursData.periods;
            const weekDay = targetHoursData.weekday_text;
            const localDayToNum = Number(moment().utc(this.place.utc_offset).format('d')) - 1;
            // const matchLocalDayToNum = localDayToNum === -1 ? 6 : localDayToNum;
            console.log(localDayToNum);
            this.localDayToNum = localDayToNum;
            this.weekDay = weekDay;
            // const formattedHours = [];
            // for (let i = 0; i < periods.length; i++) {
            //   let data: object;
            //   if (periods[i].close) {
            //     data = {dayNum:    moment(periods[i].open.nextDate).format('d'),
            //             dayOfWeek: moment(periods[i].open.nextDate).format('dddd'),
            //             openTime:  moment(periods[i].open.nextDate).format('hh:mm A') + ' - '
            //                     +  moment(periods[i].close.nextDate).format('hh:mm A')};
            //   } else {
            //     data = {openTime: 'Open 24 hours'};
            //   }
            //
            //   // console.log(data);
            //   formattedHours[i] = data;
            // }
            // console.log(formattedHours);

            if (targetHoursData.open_now) {
              $('#detailhours').prepend(`<span>Open now: ${weekDay[localDayToNum].split(/day: /)[1]}   </span>`);
            } else {
              $('#detailhours').prepend(`<span>Closed   </span>`);
            }




            $( "#detailPopupButton" ).click(() => {
              $( "#detailPopup" ).animate({ "display": "block" }, "slow" );
            });




          } else {
            $('#detailhours-row').remove();
          }




        }
      }
    });
  }

}
