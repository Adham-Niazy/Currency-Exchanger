import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencySymbols } from 'src/app/core/models';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() list: CurrencySymbols = {};
  @Input() placeholder = '';
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void { }

}
