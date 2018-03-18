import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation() {
    return this.http.get('http://ip-api.com/json');
  }
}
