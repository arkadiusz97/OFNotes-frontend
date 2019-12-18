import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { StatusService } from './status.service';
import { User } from './user';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  login: string;
  password: string;
  constructor(private http: HttpClient
  ,private statusService: StatusService,
  private globalVariablesService: GlobalVariablesService) { }
  createUser(user) {
    this.statusService.setStatusString("Processing...");
    const headers = new HttpHeaders({
    "Authorization": "Basic " + btoa(this.login + ":" + this.password),
    "Content-Type": "application/x-www-form-urlencoded",
    'Accept': 'application/json'});
    return this.http.post<User[]>(this.globalVariablesService.apiAddress + "/user",
    "login=" + encodeURIComponent(user.login) + "&password=" + encodeURIComponent(user.password),
     {headers: headers}).pipe(
     tap(_ => this.statusService.setStatusString("User created")),
     catchError(this.handleError<User[]>("User creating failed"))
    );
  }
  getUsers(): Observable<User[]> {
    let headers = new HttpHeaders().set("Authorization",
     "Basic " + btoa(this.login + ":" + this.password));
    return this.http.get<User[]>(this.globalVariablesService.apiAddress + "/user/0", {headers: headers}).pipe(
    catchError(this.handleError<User[]>("Users downloading failed")));
  }
  searchUsers(searchString: string): Observable<User[]> {
    let headers = new HttpHeaders().set("Authorization",
    "Basic " + btoa(this.login + ":" + this.password));
    return this.http.get<User[]>(this.globalVariablesService.apiAddress + "/searchusers/" +
    encodeURIComponent(searchString), {headers: headers}).pipe(
    catchError(this.handleError<User[]>("Cannot find users with given string.")));
  }
  getCurrentUser(login: string, password: string): Observable<HttpResponse<User>> {
    this.login = login;
    this.password = password;
    let headers = new HttpHeaders().set("Authorization",
     "Basic " + btoa(login + ":" + password));
    return this.http.get<User>(this.globalVariablesService.apiAddress + "/user"
    , {headers: headers, observe : 'response'});
  }
  updateUser(user) {
    this.statusService.setStatusString("Processing...");
    const headers = new HttpHeaders({
    "Authorization": "Basic " + btoa(this.login + ":" + this.password),
    "Content-Type": "application/x-www-form-urlencoded",
    'Accept': 'application/json'});
    return this.http.put<User>(this.globalVariablesService.apiAddress + "/user/" + encodeURIComponent(user.id),
    "login=" + encodeURIComponent(user.login) + "&password=" +
    encodeURIComponent(user.password), {headers: headers}).pipe(
      tap(_ => this.statusService.setStatusString("User updated")),
      catchError(this.handleError<User[]>("User update failed"))
    );
  }
  removeUser(user)
  {
    this.statusService.setStatusString("Processing...");
    const headers = new HttpHeaders({
    "Authorization": "Basic " + btoa(this.login + ":" + this.password),
    "Content-Type": "application/x-www-form-urlencoded",
    'Accept': 'application/json'});
    let options = {
      headers: headers,
      body: "id=" + user.id.toString()
    };
    return this.http.delete(this.globalVariablesService.apiAddress + "/user", options).pipe(
               tap(_ => this.statusService.setStatusString("User removed")),
               catchError(this.handleError<User[]>("User remove failed"))
             );
  }
  private handleError<T>(errorString, result?: T) {
    return (error: any): Observable<T> => {
      this.statusService.setStatusString(errorString);
      return of(result as T);
  };
  }
}
