import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css',
  '../w3.css']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  constructor(private notesService: NotesService) { }
  ngOnInit() {
  }
  updateNote() {
    this.notesService.updateNote(this.note).subscribe();
  }
}
