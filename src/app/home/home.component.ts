import { Component, ElementRef, OnInit } from '@angular/core';
import { Note } from '../model/note.model';
import { NoteService } from '../service/note.service';
import { Router } from '@angular/router';

import { RoutePath } from '../enum/route-path';
import { Message } from '../enum/message';
import { ToastService } from '../toast/toast-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NoteService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.noteService
      .getAll().subscribe(
        notes => this.notes = notes,
        error => {
          if (error.status == 0) {
            this.toastService.showErrorToast(Message.ServerDown);
          }
        });
  }

  routeToCreateNote() {
    this.router.navigate([RoutePath.CreateNote]);
  }

  routeToUpdateNote(id: number) {
    this.router.navigate([RoutePath.UpdateNote + id]);
  }

  delete(id: number) {
    this.noteService
      .deleteById(id).subscribe(
        () => {
          this.getAll();
          this.toastService.showSuccessToast(Message.NoteDeleted);
        },
        error => {
          if (error.status == 0) {
            this.toastService.showErrorToast(Message.ServerDown);
          } else {
            this.toastService.showErrorToast(error.error.message);
          }
        }
      )
  }
}
