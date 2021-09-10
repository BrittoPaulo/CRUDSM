import { Component, OnInit } from '@angular/core';
import { ResponseObjectUsers } from './user.model';
import { UserService } from './user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  responseObjectUsers!: ResponseObjectUsers;
  displayedColumns: string[] = ['id', 'avatar', 'nome', 'email', 'actions'];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const apiData = this.userService.getUsers(0);

    apiData.subscribe((res) => {
      console.log(res)
      this.responseObjectUsers = res;
      this.responseObjectUsers.data = res ? res.data.map((elem: any) => {
        return { ...elem, nome: `${elem.first_name} ${elem.last_name}` };
      }) : []
    })
  }

}
