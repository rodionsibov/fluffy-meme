import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  http = inject(HttpClient);

  private handlerError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = `An error occured: ${err.message}`;
    console.log(err);
    return throwError(() => errorMessage);
  }

  getAll$ = this.http.get<Tutorial[]>(`${environment.apiUrl}/tutorials`).pipe(
    tap((data) => console.log(JSON.stringify(data))),
    map((data) => data.reverse()),
    catchError(this.handlerError)
  );

  get$ = (id: string) =>
    this.http.get<Tutorial>(`${environment.apiUrl}/tutorials/${id}`).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handlerError)
    );

  create$ = (data: Tutorial) =>
    this.http.post<Tutorial>(`${environment.apiUrl}/tutorials`, data).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handlerError)
    );

  update$ = (id: string, data: Tutorial) =>
    this.http.put<Tutorial>(`${environment.apiUrl}/tutorials/${id}`, data).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handlerError)
    );

  delete$ = (id: string) =>
    this.http.delete<{}>(`${environment.apiUrl}/tutorials/${id}`).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handlerError)
    );

  deleteAll$ = () =>
    this.http.delete<{}>(`${environment.apiUrl}/tutorials`).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handlerError)
    );

  findByTitle = (title: string) => {
    if (!title.trim()) {
      return of([]);
    }
    return this.http
      .get<Tutorial[]>(`${environment.apiUrl}/tutorials?title=${title}`)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handlerError)
      );
  };
}
