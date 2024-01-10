import { Component, OnInit } from '@angular/core';
import { FixerService } from 'src/app/core/services/fixer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private API: FixerService) { }

  ngOnInit(): void {
    this.API.getLatestConversionRate({
      base: 'EUR',
      symbols: ""
    }).subscribe();
  }

}
