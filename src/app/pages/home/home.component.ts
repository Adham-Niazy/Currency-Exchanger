import { Component, OnInit } from '@angular/core';
import { CurrencySymbols } from 'src/app/core/models';
import { FixerService } from 'src/app/core/services/fixer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  symbols: CurrencySymbols = {};
  constructor(private API: FixerService) { }

  ngOnInit(): void {
    this.API.getSymbolsList().subscribe((res) => (this.symbols = res.symbols));
  }

}
