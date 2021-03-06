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
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private_router: Router,
    private _userService: UserService
  ) {
    this.title = "Register";
    this.user = new User(1, 'ROLE_USER','','','','');
  }

  onSubmit(form) {

    this._userService.register(this.user).subscribe(
      response => {
        this.status = response.status;
        if(this.status == 'success') {
          this.user = new User(1, 'ROLE_USER','','','','');
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    )
  }

  ngOnInit(): void {
  }

}
