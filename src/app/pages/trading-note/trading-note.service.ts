import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TradingNoteService {

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  save(tradingNote): Observable<Object> {
    const url = "http://localhost:8080"
    return this.http.post(url + '/note/', tradingNote, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  findAll(): Observable<Object> {
    const url = "http://localhost:8080"
    return this.http.get(url + '/notes/', this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  findByCode(code): Observable<Object> {
    const url = "http://localhost:8080"
    return this.http.get(url + '/note/'+code, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
