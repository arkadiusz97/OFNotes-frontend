import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css',
  '../w3.css']
})
export class UserComponent implements OnInit {
  @Input() user: User = new User();
  password: string = "";
  constructor(private usersService: UsersService,
  public statusService: StatusService) { }
  ngOnInit() {
    this.usersService.getCurrentUser(this.usersService.login, this.usersService.password)
    .subscribe(result => this.user = result.body);
  }
  updateUser() {
    if(this.user.password == null) {
      this.user.password = "";
    }
    if(this.user.password != this.password) {
      this.statusService.setStatusString("Passwords in fields aren't the same.");
      return;
    }
    this.usersService.updateUser(this.user).subscribe();
  }
}
