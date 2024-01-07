import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuOpened = false;
  public navLinks = [
    {
      id: 'eur_to_usd',
      label: 'EUR-USD Details',
      link: 'EUR-USD'
    },
    {
      id: 'eur_to_gbp',
      label: 'EUR-GBP Details',
      link: 'EUR-GBP'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

}
