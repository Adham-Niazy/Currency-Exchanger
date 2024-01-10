import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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

export class ConverterPanelComponent implements OnInit, OnDestroy, OnChanges {
  @Input() defaultFrom: string = 'EUR';
  @Input() defaultTo: string = '';
  @Input() symbols: CurrencySymbols = {};
  @Input() detailsMode: boolean = false;

  amount: FormControl = new FormControl('', [Validators.required]);
  from: FormControl = new FormControl(this.defaultFrom);
  to: FormControl = new FormControl(this.defaultTo);
  convertForm: FormGroup = new FormGroup({
    amount: this.amount,
    from: this.from,
    to: this.to,
  });

  conversionRate: number = 0;
  conversionResult: number = 0;
  $from_changes_subscription: Subscription;
  $to_changes_subscription: Subscription;
  PREMIUM_PLAN: boolean = false;
  REVERSE_MODE: boolean = false;
  IS_SWAPPING: boolean = false;

  constructor(private API: FixerService) {
    this.$from_changes_subscription = this.from.valueChanges.subscribe((newValue) => {
      this.checkAPI_Restrictions(newValue, this.to.value);
    });
    this.$to_changes_subscription = this.to.valueChanges.subscribe((newValue) => {
      this.checkAPI_Restrictions(this.from.value, newValue);
    });
  }

  ngOnInit(): void {
    this.getConversionRate();
  }

  checkAPI_Restrictions(from: string, to: string) {
    this.REVERSE_MODE = from !== 'EUR' && to === 'EUR';
    this.PREMIUM_PLAN = from !== 'EUR' && to !== 'EUR';
    if (!this.IS_SWAPPING && !this.PREMIUM_PLAN)
      this.getConversionRate();
    else
      this.IS_SWAPPING = false;
  }

  convert() {
    this.conversionRate = +(this.REVERSE_MODE ? 1 / this.conversionRate : this.conversionRate).toFixed(2);
    this.conversionResult = multiplyNumbers([this.conversionRate * this.amount.value]);
  }

  swapFromIntoTo() {
    // Only Swap if Valid Form and Not in Details Page
    if (this.convertForm.valid && !this.detailsMode) {
      this.IS_SWAPPING = true;
      const [fromValue, toValue] = [this.from.value, this.to.value];
      this.convertForm.setValue({
        amount: this.amount.value,
        from: toValue,
        to: fromValue
      });
    }
  }

  getConversionRate() {
    console.log("1 API Consumed.");
    this.conversionRate = 1.09;
    this.convert();
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log("NgOnChanges Called!");
    if (changes['defaultFrom']) {
      this.from?.setValue(changes['defaultFrom']?.currentValue);
    }
    if (changes['defaultTo']) {
      this.to?.setValue(changes['defaultTo']?.currentValue);
    }
  }

  ngOnDestroy() {
    // Unsubscribe from the valueChanges observable to prevent memory leaks
    this.$from_changes_subscription.unsubscribe();
    this.$to_changes_subscription.unsubscribe();
  }

}
