import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  save(note: any) {
    return this.http.post(this.url, note);
  }

  update(note: any) {
    return this.http.put(this.url, note);
  }

  getAll() {
    return this.http.get<Note[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Note>(this.url + id);
  }

  deleteById(id: number) {
    return this.http.delete(this.url + id)
  }

  async isExistsById(id: number): Promise<boolean> {
    //let mUrl = `http://localhost:8080/api/notes/${id}/exists`;
    let isExists = false;
    await this.http.get(this.url + id + ApiPaths.NoteExists)
      .toPromise()
      .then(() => isExists = true)
      .catch(() => isExists = false)
    return isExists;
  }
}
