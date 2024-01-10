import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencySymbols } from 'src/app/core/models';
import { FixerService } from 'src/app/core/services/fixer.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() symbols: CurrencySymbols = {}
  from: string = "";
  to: string = "";
  constructor(
    private route: ActivatedRoute,
    private API: FixerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      [this.from, this.to] = param['currencies'].split("-");
    });
    this.API.getSymbolsList().subscribe((res) => (this.symbols = res.symbols));
  }

}
