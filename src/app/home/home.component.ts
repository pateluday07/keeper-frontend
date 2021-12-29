import { Component, ElementRef, OnInit } from '@angular/core';
import { Note } from '../model/note.model';
import { NoteService } from '../service/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notes: Note[] = [];
  errorMsg!: String;

  constructor(private noteService: NoteService,
    private router: Router) { }

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
    this.router.navigate(['/create-note']);
  }

  routeToUpdateNote(id: string) {
    console.log("clicked: "+id);
    this.router.navigate(['/update-note/' + id]);
  }
}
