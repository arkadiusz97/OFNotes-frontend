import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  statusString: string = "";
  setStatusString(statusString) {
    this.statusString = statusString;
  }
  constructor() { }
}
