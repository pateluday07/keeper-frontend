import { Component, OnInit } from '@angular/core';
import { Note } from '../model/note.model';
import { NoteService } from '../service/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notes: Note[] = [];
  errorMsg!: String;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.noteService
      .getAll().subscribe(
        notes => this.notes = notes,
        error => this.errorMsg = error);
  }

}
