import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'http:/localhost:8000/api/tutorials';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor() {}
  http = inject(HttpClient);

  getAll$ = this.http.get<Tutorial[]>(`${baseUrl}`).pipe(
    tap((val) => {
      console.log('tutorials:', val);
    }),
    catchError((err) => throwError(() => err))
  );

  get$ = (id: string) => this.http.get<Tutorial>(`${baseUrl}/${id}`);

  create$ = (data: Tutorial) => this.http.post<Tutorial>(`${baseUrl}/`, data);

  update$ = (id: string, data: Tutorial) =>
    this.http.put<Tutorial>(`${baseUrl}/${id}`, data);

  delete$ = (id: string) => this.http.delete<{}>(`${baseUrl}/${id}`);

  deleteAll$ = this.http.delete<{}>(`${baseUrl}`);

  findByTitle = (title: string) =>
    this.http.get<Tutorial[]>(`${baseUrl}?Title=${title}`);
}
