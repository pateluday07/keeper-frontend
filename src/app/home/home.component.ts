import { Component, ElementRef, OnInit } from '@angular/core';
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
  showTakeANoteForm = false;

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

  takeANote() {
    this.showTakeANoteForm = true;
  }

  reSize(event: any) {
    let currentHeight = event.target.scrollHeight;
    if (currentHeight > 108 && currentHeight < 600) {
      event.target.style.height = '0';
      event.target.style.height = event.target.scrollHeight + 'px';
    }
    if (currentHeight > 600) {
      event.target.style.overflowY = "scroll";
    }
  }

}
