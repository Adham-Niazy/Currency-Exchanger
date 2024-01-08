import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { GET_FROM_STORAGE, SAVE_TO_STORAGE } from '../utils/storage';
import { SYMBOLS } from '../constants/storage';
import { isOneDayPassed } from '../utils/date';

@Injectable({
  providedIn: 'root'
})
export class FixerService {

  constructor(private http: HttpClient) { }

  getSymbolsList() {
    const savedData = GET_FROM_STORAGE(SYMBOLS);
    if (savedData.lastRequestDate) {
      // Check if one day has passed since the last request.
      if (isOneDayPassed(savedData.lastRequestDate)) {
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
}
