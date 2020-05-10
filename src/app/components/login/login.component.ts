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
    this.logout();
  }

  onSubmit(form) {

    this._userService.login(this.user).subscribe(
      response => {

        if(response.status != 'error') {
          // token
          this.status = 'success';
          this.token = response;
          localStorage.setItem('token', this.token);

          this._userService.login(this.user, true).subscribe(
            response => {
              this.identity = response;
              localStorage.setItem('identity', JSON.stringify(this.identity));

              this._router.navigate(['home']);

            },
            error => {
              console.log(<any>error);
            });
        } else {
          this.status = 'error';
        }



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

  logout() {
    console.log("logout");
    this._route.params.subscribe(params => {
      let logout = +params['sure'];
      if(logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        console.log("logout");

        this.identity = null;
        this.token = null;

        // redirect
        this._router.navigate(['home']);

      }
    })
  }



}
