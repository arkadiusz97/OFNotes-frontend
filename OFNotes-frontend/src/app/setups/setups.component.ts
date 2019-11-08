import { Component, OnInit} from '@angular/core';
import { Setup } from '../setup';
import { SetupsService } from '../setups.service';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-setups',
  templateUrl: './setups.component.html',
  styleUrls: ['./setups.component.css',
  '../w3.css']
})
export class SetupsComponent implements OnInit {
  setups: Setup[];
  userr: User = new User();
  constructor(private setupsService: SetupsService,
  private usersService: UsersService) { }
  getSetups() {
    this.setupsService.getSetups().subscribe(result => this.setups = result);
  }
  updateSetups(setup) {
    this.setupsService.updateSetups(setup).subscribe();
  }
  ngOnInit() {
    this.getSetups();
    this.usersService.getCurrentUser(this.usersService.login, this.usersService.password)
    .subscribe(result => this.userr = result.body);
  }
}
