import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'car-management-client';
  public identity;
  public token;

  constructor(
    private _userService: UserService
  ){
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
  }

  ngOnInit(): void {
    console.log('app.cmponent')
  }

}
