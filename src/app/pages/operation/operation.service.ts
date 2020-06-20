import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  save(operation): Observable<Object> {
    const url = "http://localhost:8080"
    return this.http.post(url + '/operation/', operation, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  findAll(search): Observable<Object> {
    const url = "http://localhost:8080"
    console.log(search);
    return this.http.get(url + '/operations'
    +'?broker=' + search.broker 
    + '&referenceMonth=' + search.referenceMonth 
    + '&stockName=' + search.stockName 
    + '&tradingNoteCode=' + search.tradingNoteCode 
    + '&type=' + search.typeOperation, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }


  findTotalOperation(): Observable<Object> {
    const url = "http://localhost:8080"
    return this.http.get(url + '/total-operations/', this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  findStockPosition(): Observable<Object> {
    const url = "http://localhost:8080"
    return this.http.get(url + '/stock-position/', this.httpOptions)
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
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
