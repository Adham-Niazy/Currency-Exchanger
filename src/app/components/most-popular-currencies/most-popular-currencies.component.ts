import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { POPULAR_CURRENCIES } from 'src/app/core/constants/popular_currencies';
import { CurrencyConverterService } from 'src/app/core/services/currency-converter.service';
import { FixerService } from 'src/app/core/services/fixer.service';
import { convertRatesToDisplayedRates } from 'src/app/core/utils/math';

@Component({
  selector: 'app-most-popular-currencies',
  templateUrl: './most-popular-currencies.component.html',
  styleUrls: ['./most-popular-currencies.component.scss']
})
export class MostPopularCurrenciesComponent implements OnInit {
  amountSubscription: Subscription;

  displayed_list: (string | number)[][] = [];
  amount = 0;
  base: string = "EUR";

  constructor(private API: FixerService, private currencyStore: CurrencyConverterService) {
    this.amountSubscription = this.currencyStore.amount$.subscribe((value) => {
      this.amount = value;
    });
  }

  ngOnInit(): void {
    this.getLatestConversionMapping();
  }

  getLatestConversionMapping() {
    this.API.getLatestConversionRate({
      base: this.base,
      symbols: ""
    }).subscribe((res: { rates: { [rate: string]: number } }) => {
      const popularRates: { [rate: string]: number } = {};
      for (const currency of POPULAR_CURRENCIES) {
        popularRates[currency] = res.rates[currency];
      }
      this.displayed_list = convertRatesToDisplayedRates(popularRates, this.base);
    })
  }

  ngOnDestroy(): void {
    this.amountSubscription.unsubscribe();
  }
}
