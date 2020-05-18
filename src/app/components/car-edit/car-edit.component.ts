import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-edit',
  templateUrl: '../car-new/car-new.component.html',
  providers: [UserService, CarService],
  styleUrls: ['./car-edit.component.sass']
})
export class CarEditComponent implements OnInit {

  public title_form: string;
  public identity;
  public token;
  public car;
  public status_result: string;
  public error: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
    this.title_form = "Edit car";
    console.log(this.title_form);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    // console.log(this.status);
  }

  ngOnInit(): void {
    this.getCar();
    // console.log(this.car);
  }

  onSubmit(form) {
    // console.log(this.car);
    this._carService.create(this.token, this.car).subscribe(
      response => {
        console.log(response.error);
        if(response.status != 'success') {
          this.error = response.error;
          this.status_result = 'error';
        } else {
          this.status_result = 'success'
          this.car = response.car;
          this._router.navigate(['/home']);
        }
        console.log(this.status_result);

      },
      error => {
        this.status_result = 'error';
        // this.error = error;
      }
    );
  }

  getCar() {
    this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this._carService.getCar(this.token, id).subscribe(
          response => {
            if(response.status == 'success') {
              this.car = response.car;
              console.log(this.car);
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
