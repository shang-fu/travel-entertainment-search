import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation() {
    return this.http.get('http://ip-api.com/json');
  }

  searchPlaces(queries: object) {
    if (queries['token']) {
      return this.http.get('/search', {
        params: new HttpParams()
          .set('pagetoken', queries['token'])
      });
    } else {
      return this.http.get('/search', {
        params: new HttpParams()
          .set('locale', queries['locale'])
          .append('keyword', queries['keyword'])
          .append('type', queries['category'])
          .append('distance', queries['distance'])
          .append('type', queries['category'])
          .append('lat', queries['lat'])
          .append('lng', queries['lng'])
          .append('localeOtherDetail', queries['localeOtherDetail'])
      });
    }
  }

}
