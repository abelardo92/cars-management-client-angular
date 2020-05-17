import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  providers: [UserService, CarService],
  styleUrls: ['./car-new.component.sass']
})
export class CarNewComponent implements OnInit, DoCheck {
  public title_form: string;
  public identity;
  public token;
  public car: Car;
  public status_result: string;
  public error: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
    this.title_form = "Add new car";
    console.log(this.title_form);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    // console.log(this.status);
  }

  ngOnInit(): void {
    if(this.identity == null) {
      this._router.navigate(['/login']);
    } else {
      this.car = new Car(1, '', '', 1, '', null, null);
      this.status_result = '';
      this.error = '';
      console.log("status: " + this.status_result);
    }
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

  ngDoCheck(): void {
    // this.refreshData();
  }

}
