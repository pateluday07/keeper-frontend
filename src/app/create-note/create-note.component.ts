import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../service/note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  noteForm: FormGroup;
  isNoteSaved = false;
  isError = false;
  errorMessage?: String;

  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {
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

    this.noteService.save(this.noteForm.value)
      .subscribe(
        () => {
          this.noteForm.reset();
          this.isNoteSaved = true;
          setTimeout(() => {
            this.isNoteSaved = false;
          }, 5000);
        },
        (error) => {
          if (error.status == 0) {
            this.errorMessage = "Seems like server is down at this moment, please try again after sometime!";
          } else {
            this.errorMessage = error.error.message;
          }
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        }
      );
  }

}
