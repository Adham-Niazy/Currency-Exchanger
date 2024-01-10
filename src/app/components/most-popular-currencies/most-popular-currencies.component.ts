import { Component, OnInit } from '@angular/core';
import { POPULAR_CURRENCIES } from 'src/app/core/constants/popular_currencies';
import { FixerService } from 'src/app/core/services/fixer.service';
import { convertRatesToDisplayedRates } from 'src/app/core/utils/math';

@Component({
  selector: 'app-most-popular-currencies',
  templateUrl: './most-popular-currencies.component.html',
  styleUrls: ['./most-popular-currencies.component.scss']
})
export class MostPopularCurrenciesComponent implements OnInit {
  displayed_list: (string | number)[][] = [];
  amount = 25;
  loading = true;
  base: string = "EUR";
  constructor(private API: FixerService) { }

  ngOnInit(): void {
    this.loading = true;
    // this.API.getLatestConversionRate({
    //   base: this.base,
    //   symbols: POPULAR_CURRENCIES.join(",")
    // }).subscribe((res: { rates: { [rate: string]: number } }) => {
    //   this.displayed_list = convertRatesToDisplayedRates(res.rates, this.base);
    //   this.loading = false;
    // })

    // CAD: 1.463048,
    // EGP: 33.783203,
    // GBP: 0.859989,
    // JPY: 158.248731,
    // USD: 1.093165
  }

}
