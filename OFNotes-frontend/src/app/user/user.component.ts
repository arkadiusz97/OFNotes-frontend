import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css',
  '../w3.css']
})
export class UserComponent implements OnInit {
  @Input() user: User = new User();
  constructor(private usersService: UsersService) { }
  ngOnInit() {
     this.usersService.getCurrentUser(this.usersService.login, this.usersService.password)
    .subscribe(result => this.user = result.body);
  }
  updateUser() {
    this.usersService.updateUser(this.user).subscribe();
  }
}
