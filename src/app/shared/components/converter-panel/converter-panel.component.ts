import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CurrencySymbols } from 'src/app/core/models';
import { CurrencyConverterService } from 'src/app/core/services/currency-converter.service';
import { FixerService } from 'src/app/core/services/fixer.service';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})

export class ConverterPanelComponent implements OnInit, OnChanges {
  @Input() defaultFrom: string = '';
  @Input() defaultTo: string = '';
  @Input() detailsMode: boolean = false;

  symbols: CurrencySymbols = {};
  loading: boolean = true;

  amount: FormControl = new FormControl('', [Validators.required]);
  from: FormControl = new FormControl(this.defaultFrom);
  to: FormControl = new FormControl(this.defaultTo);
  convertForm: FormGroup = new FormGroup({
    amount: this.amount,
    from: this.from,
    to: this.to,
  });

  constructor(
    public currencyStore: CurrencyConverterService,
    private API: FixerService,
  ) {
  }

  ngOnInit(): void {
    this.API.getSymbolsList().subscribe((res) => (this.symbols = res.symbols));
    this.convert();
  }

  convert() {
    this.API.getLatestConversionRate({
      base: this.from.value,
      symbols: ""
    }).subscribe(
      (res) => {
        this.handleConversionSuccess(res, this.from.value, this.to.value);
      }
    );
  }

  handleConversionSuccess(res: any, from: string, to: string) {
    let conversionRate: number;
    if (from === 'EUR') {
      conversionRate = +(res.rates[to]).toFixed(2);
    } else if (to === 'EUR') {
      conversionRate = +(1 / res.rates[from]).toFixed(2);
    } else {
      conversionRate = 0;
    }
    this.currencyStore.setConverstionRate(conversionRate);
    this.currencyStore.convertCurrencies(this.amount.value, this.from.value, this.to.value)
    // You can add more reusable logic if needed
  }

  swapFromIntoTo() {
    // Only Swap if Valid Form and Not in Details Page
    if (this.convertForm.valid && !this.detailsMode) {
      const [fromValue, toValue] = [this.from.value, this.to.value];
      this.convertForm.setValue({
        amount: this.amount.value,
        from: toValue,
        to: fromValue
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("NgOnChanges Called!");
    if (changes['defaultFrom']) {
      this.from?.setValue(changes['defaultFrom']?.currentValue);
      this.currencyStore.from = changes['defaultFrom']?.currentValue;
    }
    if (changes['defaultTo']) {
      this.to?.setValue(changes['defaultTo']?.currentValue);
      this.currencyStore.to = changes['defaultTo']?.currentValue;
    }
  }

}
