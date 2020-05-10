import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService],
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public title: string;
  public user:User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = "Set your identity";
    this.user = new User(1, 'ROLE_USER','','','','');
  }

  ngOnInit(): void {
    console.log("login loaded succesfully!!")
  }

  onSubmit(form) {

    this._userService.signup(this.user).subscribe(
      response => {
        // token
        console.log(response);

        this._userService.signup(this.user, true).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(<any>error);
          });


        // this.status = response.status;
        // if(this.status == 'success') {
        //   this.user = new User(1, 'ROLE_USER','','','','');
        //   form.reset();
        // } else {
        //   this.status = 'error';
        // }
      },
      error => {
        this.status = 'error';
      }
    )
  }

}
