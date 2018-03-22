import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation() {
    return this.http.get('http://ip-api.com/json');
  }

  searchPlaces(queries: object, lat: string, lng: string) {
    return this.http.get('/search', {
      params: new HttpParams()
        .set('locale', queries['locale'])
        .append('keyword', queries['keyword'])
        .append('type', queries['category'])
        .append('distance', queries['distance'])
        .append('type', queries['category'])
        .append('lat', lat)
        .append('lng', lng)
        .append('localeOtherDetail', queries['localeOtherDetail'])
    });
  }

}
