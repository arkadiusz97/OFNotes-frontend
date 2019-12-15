import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { StatusService } from '../status.service';
import { GlobalVariablesService } from '../global-variables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css',
  '../w3.css']
})
export class TopbarComponent implements OnInit {
  @Input() version: string;
  password: string;
  login: string;
  user: User = new User();
  showWelcome: boolean = false;
  constructor(private usersService: UsersService,
  public statusService: StatusService,
  public globalVariablesService: GlobalVariablesService,
  private router: Router) { }
  getUser() {
    this.router.navigate(['/']);
    this.usersService.getCurrentUser(this.login, this.password)
    .subscribe(
      res => {
      this.user = res.body;
      this.showWelcome = true;
      this.statusService.setStatusString("Login successful.");
    },
    err=>{
      if(err.status == 401)
        this.statusService.setStatusString("Unauthorized");
      else
        this.statusService.setStatusString("Another error.");
    });
  }
  ngOnInit() {
    this.login = "";
    this.password = "";
  }
}
