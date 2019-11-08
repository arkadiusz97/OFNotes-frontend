import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Setup } from './setup';
import { UsersService } from './users.service';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root'
})
export class SetupsService {
  constructor(private http: HttpClient,
  private usersService: UsersService,
  private statusService: StatusService) { }
  getSetups(): Observable<Setup[]> {
    let headers = new HttpHeaders().set("Authorization", "Basic " + btoa(this.usersService.login + ":" + this.usersService.password));
    return this.http.get<Setup[]>("http://localhost:8080/setups", {headers: headers}).pipe(
               //tap(_ => this.statusService.setStatusString("Setup downloaded")),
               catchError(this.handleError<Setup[]>("Setup downloading failed"))
             );
  }
  updateSetups(setup) {
    this.statusService.setStatusString("Processing...");
    const headers = new HttpHeaders({
    "Authorization": "Basic " + btoa(this.usersService.login + ":" + this.usersService.password),
    "Content-Type": "application/x-www-form-urlencoded",
    'Accept': 'application/json'});
    return this.http.put<Setup>("http://localhost:8080/setups", setup.name + "=" + setup.value
    , {headers: headers}).pipe(
               tap(_ => this.statusService.setStatusString("Setup updated")),
               catchError(this.handleError<Setup[]>("Setup update failed"))
             );
  }
  private handleError<T>(errorString, result?: T) {
    return (error: any): Observable<T> => {
      this.statusService.setStatusString(errorString);
      return of(result as T);
    };
  }
}
