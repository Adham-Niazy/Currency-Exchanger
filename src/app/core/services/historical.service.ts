import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {

  constructor(private http: HttpClient) { }

  getHistoricalRates(date: string, params: { base: string, symbols: string }): Observable<any> {
    return this.http.get(`/${date}`, {
      params
    });
  }
}
