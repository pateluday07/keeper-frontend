import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-path';
import { Note } from '../model/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Note[]> {
    let url = this.baseUrl + ApiPaths.Notes;
    return this.http.get<Note[]>(url);
  }
}
