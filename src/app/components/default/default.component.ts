import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  providers: [UserService, CarService],
  styleUrls: ['./default.component.sass']
})
export class DefaultComponent implements OnInit {

  public title:string;
  public user:User;
  public status: string;
  public identity: any;
  public token: any;
  public cars: Array<Car>;


  constructor(
    private _route: ActivatedRoute,
    private_router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
    this.title = "Home";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(1, 'ROLE_USER','','','','');
  }

  ngOnInit(): void {
    console.log(this.token);
    this._carService.getCars(this.token).subscribe(
      response => {
        if(response.status == 'success') {
          console.log(response.cars);
          this.cars = response.cars;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
