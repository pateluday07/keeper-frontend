import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from '../enum/message';
import { RoutePath } from '../enum/route-path';
import { NoteService } from '../service/note.service';
import { ToastService } from '../toast/toast-service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit, OnDestroy {

  private routeSub?: Subscription;

  readonly noteTitleRequired = Message.NoteTitleRequired;
  readonly noteTitleMaxLength = Message.NoteTitleMaxLength;

  noteForm: FormGroup;
  isUpdateBtnDisable = false;

  constructor(private formBuilder: FormBuilder, private noteService: NoteService, private activateRoute: ActivatedRoute,
    private route: Router, private toastService: ToastService) {
    this.noteForm = this.formBuilder.group({
      id: [],
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
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      this.noteForm.markAsDirty();
      return;
    }

    this.isUpdateBtnDisable = true;
    this.noteService.update(this.noteForm.value)
      .subscribe(
        () => {
          this.toastService.showSuccessToast(Message.NoteUpdated);
          this.isUpdateBtnDisable = false;
          this.route.navigate([RoutePath.Home]);
        },
        error => {
          if (error.status == 0) {
            this.toastService.showErrorToast(Message.ServerDown);
          } else {
            this.toastService.showErrorToast(error.error.message);
          }
          this.isUpdateBtnDisable = false;
        }
      );
  }

  getById(id: number) {
    this.noteService.getById(id)
      .subscribe(
        note => {
          this.noteForm.patchValue({
            id: note.id,
            title: note.title,
            description: note.description
          })
        },
        error => {
          if (error.status == 0) {
            this.toastService.showErrorToast(Message.ServerDown);
          } else {
            this.toastService.showErrorToast(error.error.message);
          }
          this.route.navigate([RoutePath.Home]);
        }
      )
  }

}
