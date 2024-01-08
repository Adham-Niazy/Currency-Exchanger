import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CurrencySymbols } from 'src/app/core/models';
import { FixerService } from 'src/app/core/services/fixer.service';
import { multiplyNumbers } from 'src/app/core/utils/math';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})

export class ConverterPanelComponent implements OnInit, OnDestroy {
  amount: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0.00001)
  ]);
  from: FormControl = new FormControl('EUR');
  to: FormControl = new FormControl('USD');

  convertForm: FormGroup = new FormGroup({
    amount: this.amount,
    from: this.from,
    to: this.to,
  });

  symbols: CurrencySymbols = {};
  conversionRate: number = 0;
  conversionResult: number = 0;
  $from_changes_subscription: Subscription;
  $to_changes_subscription: Subscription;
  PREMIUM_PLAN: boolean = false;

  constructor(private API: FixerService) {
    this.$from_changes_subscription = this.from.valueChanges.subscribe(() => {
      this.getConversionRate();
    });
    this.$to_changes_subscription = this.to.valueChanges.subscribe(() => {
      this.getConversionRate();
    });
  }

  ngOnInit(): void {
    this.API.getSymbolsList().subscribe((res) => (this.symbols = res.symbols));
    this.getConversionRate();
  }

  convert() {
    this.conversionResult = multiplyNumbers([this.conversionRate * this.amount.value]);
  }

  swapFromIntoTo() {
    if (this.convertForm.valid) {
      const fromValue = this.from.value;
      const toValue = this.to.value;
      this.convertForm.setValue({
        amount: this.amount.value,
        from: toValue,
        to: fromValue
      })
    }
  }

  getConversionRate() {
    // this.API.getLatestConversionRate({
    //   base: this.from.value,
    //   symbols: this.to.value
    // }).subscribe((res) => {
    //   if (res.success) {
    //     this.conversionRate = Math.trunc(res.rates[this.to.value] * 100) / 100;
    //     this.PREMIUM_PLAN = false;
    //     this.convert();
    //   } else {
    //     if (res.error.code === 105)
    //       this.PREMIUM_PLAN = true;
    //   }
    // });
  }

  ngOnDestroy() {
    // Unsubscribe from the valueChanges observable to prevent memory leaks
    this.$from_changes_subscription.unsubscribe();
    this.$to_changes_subscription.unsubscribe();
  }

}
