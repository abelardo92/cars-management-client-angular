import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.sass']
})
export class DefaultComponent implements OnInit {

  public title:string;
  public user:User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private_router: Router,
    private _userService: UserService
  ) {
    this.title = "Home";
    this.user = new User(1, 'ROLE_USER','','','','');
  }

  ngOnInit(): void {
  }

}
