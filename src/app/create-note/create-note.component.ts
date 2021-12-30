import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../enum/message';
import { NoteService } from '../service/note.service';
import { ToastService } from '../toast/toast-service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  readonly noteTitleRequired = Message.NoteTitleRequired;
  readonly noteTitleMaxLength = Message.NoteTitleMaxLength;

  noteForm: FormGroup;
  isSaveBtnDisable = false;

  constructor(private formBuilder: FormBuilder, private noteService: NoteService, private toastService: ToastService) {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  save() {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      this.noteForm.markAsDirty();
      return;
    }

    this.isSaveBtnDisable = true;
    this.noteService.save(this.noteForm.value)
      .subscribe(
        () => {
          this.noteForm.reset();
          this.toastService.showSuccessToast(Message.NoteSaved);
          this.isSaveBtnDisable = false;
        },
        error => {
          if (error.status == 0) {
            this.toastService.showErrorToast(Message.ServerDown);
          } else {
            this.toastService.showErrorToast(error.error.message);
          }
          this.isSaveBtnDisable = false;
        }
      );
  }

}
