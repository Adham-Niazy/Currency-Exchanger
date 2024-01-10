import { Injectable } from '@angular/core';

import { multiplyNumbers } from '../utils/math';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  private AmountSubject = new BehaviorSubject<number>(0);
  amount$: Observable<number> = this.AmountSubject.asObservable();
  from: string = 'EUR';
  to: string = 'USD';
  conversionRate: number = 0;
  conversionResult: number = 0;
  PREMIUM_PLAN: boolean = false;

  constructor() { }

  checkAPI_Restrictions(from: string, to: string) {
    this.PREMIUM_PLAN = from !== 'EUR' && to !== 'EUR';
  }

  setNewFromAndTo(from: string, to: string) {
    if (from !== this.from || this.to !== to) {
      this.from = from;
      this.to = to;
    }
  }

  swapCurrencies() {
    this.setNewFromAndTo(this.to, this.from);
    console.log("I swapped")
  }

  setConverstionRate(newRate: number) {
    this.conversionRate = +newRate.toFixed(2);
  }

  setAmount(newAmount: number) {
    this.AmountSubject.next(newAmount);
  }

  getAmount(): number {
    return this.AmountSubject.value;
  }

  convertCurrencies(amount: number, from: string, to: string) {
    this.setAmount(amount);
    this.setNewFromAndTo(from, to);
    this.checkAPI_Restrictions(from, to);
    this.setConverstionRate(this.conversionRate);
    this.conversionResult = multiplyNumbers([(this.conversionRate) * amount]);
  }
}
