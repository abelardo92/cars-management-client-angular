import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService {
  public url: string;
  public headers: HttpHeaders;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url;
    this.headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
  }

  register(user): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json='+json;
    return this._http.post(this.url+'register', params, { headers: this.headers });
  }

  signup(user, getToken = null): Observable<any> {
    if(getToken) {
      user.get_token = true;
    }
    let json = JSON.stringify(user);
    let params = 'json='+json;
    console.log(json);
    return this._http.post(this.url+'login', params, { headers: this.headers });
  }

  test() {
    return "test";
  }

}
