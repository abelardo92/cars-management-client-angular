import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Car } from '../models/car';

@Injectable()
export class CarService {
  public url: string;
  public headers: HttpHeaders;
  public identity;
  public token;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  create(token, car: Car) : Observable<any> {
    let json = JSON.stringify(car);
    let params = 'json='+json;
    this.headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.post(this.url+'cars', params, { headers: this.headers });
  }

  getCars(token) : Observable<any> {
    this.headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.get(this.url+'cars', { headers: this.headers });
  }

  getCar(token, id) : Observable<any> {
    this.headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.get(this.url+'cars/' + id, { headers: this.headers });
  }

}
