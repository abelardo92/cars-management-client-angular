import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  providers: [UserService],
  styleUrls: ['./car-new.component.sass']
})
export class CarNewComponent implements OnInit {
  public title: string;
  public identity;
  public token;
  public car: Car;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = "Add new car";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    if(this.identity == null) {
      this._router.navigate(['/login']);
    } else {
      this.car = new Car(1, '', '', 1, '', null, null);
    }
  }

}
