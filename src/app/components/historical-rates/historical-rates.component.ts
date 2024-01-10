import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { HISTORY } from 'src/app/core/constants/storage';
import { HistoricalService } from 'src/app/core/services/historical.service';
import { isAmountTimePassed } from 'src/app/core/utils/date';
import { GET_FROM_STORAGE, SAVE_TO_STORAGE } from 'src/app/core/utils/storage';

@Component({
  selector: 'app-historical-rates',
  templateUrl: './historical-rates.component.html',
  styleUrls: ['./historical-rates.component.scss']
})
export class HistoricalRatesComponent implements OnInit {
  @Input() from: string = 'EUR';
  @Input() to: string = 'USD';

  historicalData: any[] = [];
  labels: string[] = [];
  rates: number[] = [];
  constructor(private historicalServicesAPI: HistoricalService) { }

  ngOnInit(): void {
    this.initial();
  }

  private initial() {
    this.labels = [];
    this.rates = [];
    this.checkHistorical();
  }

  private getMonthlyHistorical() {
    const requests = this.getMonthlyRequests();
    forkJoin(requests).subscribe(
      (responses: any[]) => {
        const dataToStore = {
          data: responses,
          lastRequestDate: new Date().toISOString(),
          to: this.to
        };
        SAVE_TO_STORAGE(HISTORY, dataToStore);
        this.historicalData = responses;
        this.mapRatesToChartsData(this.historicalData);

      }
    );
  }

  private checkHistorical() {
    const savedData = GET_FROM_STORAGE(HISTORY);
    if (savedData.to === this.to && savedData.lastRequestDate) {
      if (isAmountTimePassed(savedData.lastRequestDate, 10 * 24 * 60 * 60 * 1000)) {
        this.getMonthlyHistorical();
      } else {
        this.historicalData = savedData.data;
        this.mapRatesToChartsData(this.historicalData);
      }
    } else {
      return this.getMonthlyHistorical();
    }
  }

  private getMonthlyRequests(): Observable<any>[] {
    const currentDate = new Date();
    const requests: Observable<any>[] = [];

    for (let i = 0; i < 12; i++) {
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const lastDayFormatted = this.formatDate(lastDayOfMonth);
      const request = this.historicalServicesAPI.getHistoricalRates(lastDayFormatted, {
        base: this.from,
        symbols: this.to
      });
      requests.push(request);
      currentDate.setMonth(currentDate.getMonth() - 1); // Move to the previous month
    }
    return requests;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    console.log(date.getDate().toString())
    return `${year}-${month}-${day}`; // Assuming you want rates for the first day of each month
  }

  private mapRatesToChartsData(monthlyRates: any[]) {
    for (const rate of monthlyRates) {
      if (rate.success) {
        this.labels.push(rate.date);
        this.rates.push(rate.rates[this.to]);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['to'] && !changes['to'].firstChange) {
      this.initial();
    }
  }
}
