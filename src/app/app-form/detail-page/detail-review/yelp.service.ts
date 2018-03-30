import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class YelpService {
  constructor(private http: HttpClient) {}


  getReviews(queries: object) {

    return this.http.get('/yelp', {
      params: new HttpParams()
        .set('name', queries['name'])
        .append('address1', queries['address1'])
        .append('address2', queries['address2'])
        .append('city', queries['city'])
        .append('state', queries['state'])
        .append('country', queries['country'])
    });

  }

}
