import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public title: string;
  public user:User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = "Set your identity";
    this.user = new User(1, 'ROLE_USER','','','','');
  }

  ngOnInit(): void {
    console.log("login loaded succesfully!!")
  }

  onSubmit(form) {
    console.log(this.user);
  }

}
