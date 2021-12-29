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
  private url = this.baseUrl + ApiPaths.Notes;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url);
  }

  save(note: any): Observable<Note> {
    return <Observable<Note>>this.http.post(this.url, note);
  }

  getById(id: number): Observable<Note> {
    return <Observable<Note>>this.http.get(this.url + id);
  }
}
