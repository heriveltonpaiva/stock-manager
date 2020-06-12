import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TotalOperationMonth } from './response/total-operation-month';

import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  retry,
  catchError
} from "rxjs/operators";
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  findTotalOperationYear(): Observable<Object> {
    const url = "http://localhost:8080"
    return this.http.get(url + '/total-operations/year/', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  findTotalOperationMonth(): Observable<TotalOperationMonth[]> {
    const apiURL = "http://localhost:8080/total-operations/month/";
    return this.http.get<TotalOperationMonth[]>(apiURL)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

     // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  
}
