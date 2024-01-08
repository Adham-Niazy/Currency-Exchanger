import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CurrencySymbols } from 'src/app/core/models';
import { FixerService } from 'src/app/core/services/fixer.service';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})

export class ConverterPanelComponent implements OnInit {
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
  constructor(private API: FixerService) { }

  ngOnInit(): void {
    this.API.getSymbolsList().subscribe((res) => (this.symbols = res.symbols));
  }

  convert() {
    console.log(this.convertForm.value)
  }

}
