import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  providers: [UserService, CarService],
  styleUrls: ['./car-detail.component.sass']
})
export class CarDetailComponent implements OnInit {
  public title_form: string;
  public identity: any;
  public token: any;
  public car;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
    this.title_form = "Add new car";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCar();
    // console.log(this.car);
  }

  getCar() {
    this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this._carService.getCar(this.token, id).subscribe(
          response => {
            if(response.status == 'success') {
              // console.log(response.car);
              this.car = response.car;
            } else {
              this._router.navigate(['home']);
            }
          },
          error => {
            console.log(error);
          }
        )
      }
    )
  }

}
