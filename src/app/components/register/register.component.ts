import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService],
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public title:string;
  public user:User;

  constructor(
    private _route: ActivatedRoute,
    private_router: Router,
    private _userService: UserService
  ) {
    this.title = "Register";
    this.user = new User(1, 'ROLE_USER','','','','');
  }

  onSubmit() {
    console.log(this.user);
    console.log(this._userService.test());
  }

  ngOnInit(): void {
  }

}
