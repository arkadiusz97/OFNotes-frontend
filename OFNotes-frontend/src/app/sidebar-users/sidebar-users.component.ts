import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UsersService } from '../users.service';
import { GlobalVariablesService } from '../global-variables.service';
import { User } from '../user';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-sidebar-users',
  templateUrl: './sidebar-users.component.html',
  styleUrls: ['./sidebar-users.component.css',
  '../w3.css']
})
export class SidebarUsersComponent implements OnInit {
  users: User[];
  user: User;
  newUser: User = new User();
  mySubscription;
  constructor(private usersService: UsersService,
  private statusService: StatusService,
  public globalVariablesService: GlobalVariablesService,
  private router: Router) {
    this.mySubscription = this.router.events.subscribe((e: any) => {
      if(e instanceof NavigationEnd) {
        this.router.navigated = false;
        if(this.globalVariablesService.searchString.length == 0) {
          this.getUsers();
        }
        else {
          this.usersService.searchUsers(this.globalVariablesService.searchString).
          subscribe(result => {
            this.users = result;
            this.globalVariablesService.searchString = "";
          });
        }
      }
    });
  }
  createUser() {
    if(!this.newUser.login) {
      this.statusService.setStatusString("Empty login.");
      return;
    }
    this.usersService.createUser(this.newUser).subscribe(_ => {
      this.getUsersAndSelectLast();
    });
    this.newUser.login = "";
  }
  getUsersAndSelectLast() {
    this.usersService.getUsers().subscribe(result => {
      this.users = result;
      this.selectUser(this.users[this.users.length-1]);
    });
  }
  getUsers() {
    this.users = [];
    this.usersService.getUsers().subscribe(result => this.users = result);
  }
  selectUser(user) {
    this.user = user;
  }
  removeUser(user) {
    this.usersService.removeUser(user).subscribe(_ => {
      this.getUsers();
    },
    _ => this.statusService.setStatusString("Users remove failed"));
  }
  ngOnInit() {

  }
  ngOnDestroy() {
    if(this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
