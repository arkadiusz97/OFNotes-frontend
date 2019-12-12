import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Note } from './note';
import { StatusService } from './status.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient,
  private statusService: StatusService,
  private usersService: UsersService) { }
  createNote(note) {
    this.statusService.setStatusString("Processing...");
    const headers = new HttpHeaders({
    "Authorization": "Basic " + btoa(this.usersService.login + ":" + this.usersService.password),
    "Content-Type": "application/x-www-form-urlencoded",
    'Accept': 'application/json'});
    return this.http.post<Note[]>("http://localhost:8080/note", "name=" + encodeURIComponent(note.name) + "&note=", {headers: headers}).pipe(
               tap(_ => this.statusService.setStatusString("Note created")),
               catchError(this.handleError<Note[]>("Notes creating failed"))
             );
  }
  getNotes(): Observable<Note[]> {
    let headers = new HttpHeaders().set("Authorization", "Basic " +
    btoa(this.usersService.login + ":" + this.usersService.password));
    return this.http.get<Note[]>("http://localhost:8080/note/0", {headers: headers})
    .pipe(
           //tap(_ => this.statusService.setStatusString("Notes downloaded")),
           catchError(this.handleError<Note[]>("Notes downloading failed"))
         );
  }
  updateNote(note) {
    this.statusService.setStatusString("Processing...");
    const headers = new HttpHeaders({
    "Authorization": "Basic " + btoa(this.usersService.login + ":" + this.usersService.password),
    "Content-Type": "application/x-www-form-urlencoded",
    'Accept': 'application/json'});
    return this.http.put<Note>("http://localhost:8080/note/" + encodeURIComponent(note.id),
    "name=" + encodeURIComponent(note.name) + "&note=" +
    encodeURIComponent(note.note), {headers: headers}).pipe(
    tap(_ => this.statusService.setStatusString("Note updated")),
    catchError(this.handleError<Note[]>("Note update failed"))
      );
  }
  removeNote(note)
  {
    this.statusService.setStatusString("Processing...");
    const headers = new HttpHeaders({
    "Authorization": "Basic " + btoa(this.usersService.login + ":" + this.usersService.password),
    "Content-Type": "application/x-www-form-urlencoded",
    'Accept': 'application/json'});
    let options = {
      headers: headers,
      body: "id=" + note.id.toString()
    };
    return this.http.delete("http://localhost:8080/note", options).pipe(
               tap(_ => this.statusService.setStatusString("Note removed")),
               catchError(this.handleError<Note[]>("Notes remove failed"))
             );
  }
  private handleError<T>(errorString, result?: T) {
    return (error: any): Observable<T> => {
      this.statusService.setStatusString(errorString);
      return of(result as T);
  };
}
}
