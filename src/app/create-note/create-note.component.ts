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
        (success) => {
          this.noteForm.reset();
          this.isNoteSaved = true;

          setTimeout(() => {
            this.isNoteSaved = false;
          }, 4000);
        },
        (error) => { console.log("error") }
      );
  }

}
