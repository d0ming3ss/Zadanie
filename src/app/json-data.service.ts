import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {

  private jsonUrl = './assets/data.json';

  constructor(private http: HttpClient) { }

  getJsonData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Wystąpił błąd podczas pobierania danych JSON:', error);
    throw error;
  }
}
