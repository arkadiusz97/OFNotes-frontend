import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { StatusService } from '../status.service';
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
    constructor(private notesService: NotesService,
    private statusService: StatusService) { }
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
      this.getNotes();
    }
}
