import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from '../enum/message';
import { RoutePath } from '../enum/route-path';
import { NoteService } from '../service/note.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit, OnDestroy {

  private routeSub?: Subscription;

  readonly noteTitleRequired = Message.NoteTitleRequired;
  readonly noteTitleMaxLength = Message.NoteTitleMaxLength;
  readonly noteUpdated = Message.NoteUpdated;

  noteForm: FormGroup;
  isNoteUpdated = false;
  isError = false;
  isUpdateBtnDisable = false;
  errorMessage?: String;

  constructor(private formBuilder: FormBuilder, private noteService: NoteService, private activateRoute: ActivatedRoute,
    private route: Router) {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.routeSub = this.activateRoute.params.subscribe(params => {
      this.getById(params.id);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  update() {

  }

  getById(id: number) {
    this.noteService.getById(id)
      .subscribe(
        note => {
          this.noteForm.patchValue({
            title: note.title,
            description: note.description
          })
        },
        error => {
          if (error.status == 0) {
            this.errorMessage = Message.ServerDown;
          } else {
            this.errorMessage = error.error.message;
          }
          this.isError = true;
          setTimeout(() => {
            this.route.navigate([RoutePath.Home])
          }, 5000)
        }
      )
  }

}
