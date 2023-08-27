import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor() {}
  http = inject(HttpClient);

  getAll$ = this.http.get<Tutorial[]>(`${environment.apiUrl}`).pipe(
    tap((val) => {
      console.log('tutorials:', val);
    }),
    catchError((err) => throwError(() => err))
  );

  get$ = (id: string) => this.http.get<Tutorial>(`${environment.apiUrl}/${id}`);

  create$ = (data: Tutorial) => this.http.post<Tutorial>(`${environment.apiUrl}`, data);

  update$ = (id: string, data: Tutorial) =>
    this.http.put<Tutorial>(`${environment.apiUrl}/${id}`, data);

  delete$ = (id: string) => this.http.delete<{}>(`${environment.apiUrl}/${id}`);

  deleteAll$ = this.http.delete<{}>(`${environment.apiUrl}`);

  findByTitle = (title: string) =>
    this.http.get<Tutorial[]>(`${environment.apiUrl}?Title=${title}`);
}
