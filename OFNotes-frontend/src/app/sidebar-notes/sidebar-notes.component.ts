import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { NotesService } from '../notes.service';
import { StatusService } from '../status.service';
import { GlobalVariablesService } from '../global-variables.service';
import { Note } from '../note';

@Component({
  selector: 'app-sidebar-notes',
  templateUrl: './sidebar-notes.component.html',
  styleUrls: ['./sidebar-notes.component.css',
  '../w3.css']
})
export class SidebarNotesComponent implements OnInit {
    notes: Note[];
    note: Note;
    newNote: Note = new Note();
    status;
    subscribeData;
    mySubscription;
    constructor(private notesService: NotesService,
    private statusService: StatusService,
    public globalVariablesService: GlobalVariablesService,
    private router: Router) {
      this.mySubscription = this.router.events.subscribe((e: any) => {
        if(e instanceof NavigationEnd) {
          this.router.navigated = false;
          if(this.globalVariablesService.searchString.length == 0) {
            this.getNotes();
          }
          else {
            this.notesService.searchNotes(this.globalVariablesService.searchString).
            subscribe(result => {
              this.notes = result;
              this.globalVariablesService.searchString = "";
            });
          }
        }
      });
    }
    createNote() {
      if(!this.newNote.name) {
        this.statusService.setStatusString("Empty note name.");
        return;
      }
      this.notesService.createNote(this.newNote).subscribe(_ => {
        this.getNotesAndSelectLast();
      });
      this.newNote.name = "";
    }
    getNotes() {
      this.notesService.getNotes().subscribe(result => this.notes = result);
    }
    getNotesAndSelectLast() {
      this.notesService.getNotes().subscribe(result => {
        this.notes = result;
        this.selectNote(this.notes[this.notes.length-1]);
      });
    }
    selectNote(note) {
      this.note = note;
    }
    removeNote(note) {
      this.notesService.removeNote(note).subscribe(_ => {
        this.getNotes();
      },
      _ => this.statusService.setStatusString("Notes remove failed"));
    }
    ngOnInit() {

    }
    ngOnDestroy() {
      if(this.mySubscription) {
        this.mySubscription.unsubscribe();
      }
    }
}
