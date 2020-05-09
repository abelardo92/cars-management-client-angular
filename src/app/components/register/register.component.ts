import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public title:string;
  public user:User;

  constructor() {
    this.title = "Register";
    this.user = new User(1, 'ROLE_USER','','','','');
  }

  ngOnInit(): void {
  }

}
