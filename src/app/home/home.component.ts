import { Component, ElementRef, OnInit } from '@angular/core';
import { Note } from '../model/note.model';
import { NoteService } from '../service/note.service';
import { Router } from '@angular/router';

import { RoutePath } from '../enum/route-path';
import { Message } from '../enum/message';

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
        error => {
          this.errorMsg = error;
          if (error.status == 0) {
            //ToDo dispaly error message in tost alert
            Message.ServerDown;
          }
        });
  }

  routeToCreateNote() {
    this.router.navigate([RoutePath.CreateNote]);
  }

  routeToUpdateNote(id: number) {
    this.router.navigate([RoutePath.UpdateNote + id]);
  }
}
