import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { GET_FROM_STORAGE, SAVE_TO_STORAGE } from '../utils/storage';
import { RATES, SYMBOLS } from '../constants/storage';
import { isAmountTimePassed } from '../utils/date';

@Injectable({
  providedIn: 'root'
})
export class FixerService {

  constructor(private http: HttpClient) { }

  private getSymbolsListFromFixer() {
    return this.http.get('symbols').pipe(
      map((data) => {
        // Store the data in localStorage along with the current date
        const dataToStore = {
          data,
          lastRequestDate: new Date().toISOString(),
        };
        SAVE_TO_STORAGE(SYMBOLS, dataToStore)
        return data;
      }),
    );
  }

  private getLatesRatesFromFixer(params: { base: string, symbols: string }) {
    return this.http.get('latest', {
      params
    }).pipe(
      map((data: any) => {
        // Store the data in localStorage along with the current date
        const dataToStore = {
          data,
          lastRequestDate: new Date().toISOString(),
        };
        SAVE_TO_STORAGE(RATES, dataToStore)
        return data;
      }),
    );
  }

  getSymbolsList() {
    const savedData = GET_FROM_STORAGE(SYMBOLS);
    if (savedData.lastRequestDate) {
      // Check if one day has passed since the last request.
      if (isAmountTimePassed(savedData.lastRequestDate, 24 * 60 * 60 * 1000)) {
        // If one day has passed, we will make a new request.
        return this.getSymbolsListFromFixer();
      } else {
        // If not, return stored data as Observable.
        return of(savedData.data);
      }
    } else {
      // If no data is stored, make a new request
      return this.getSymbolsListFromFixer();
    }
  }

  getLatestConversionRate(params: { base: string, symbols: string }): Observable<any> {
    const savedData = GET_FROM_STORAGE(RATES);
    if (savedData.lastRequestDate) {
      // Check if one day has passed since the last request.
      if (isAmountTimePassed(savedData.lastRequestDate, 60 * 60 * 1000)) {
        // If one day has passed, we will make a new request.
        return this.getLatesRatesFromFixer(params);
      } else {
        // If not, return stored data as Observable.
        return of(savedData.data);
      }
    } else {
      // If no data is stored, make a new request
      return this.getLatesRatesFromFixer(params);
    }
  }
}
