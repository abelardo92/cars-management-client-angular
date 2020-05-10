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
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = "Set your identity";
    this.user = new User(1, 'ROLE_USER','','','','');
  }

  ngOnInit(): void {
    let user = this._userService.getIdentity();
  }

  onSubmit(form) {

    this._userService.signup(this.user).subscribe(
      response => {
        // token
        this.token = response;
        localStorage.setItem('token', this.token);

        this._userService.signup(this.user, true).subscribe(
          response => {
            this.identity = response;
            localStorage.setItem('identity', JSON.stringify(this.identity));
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
