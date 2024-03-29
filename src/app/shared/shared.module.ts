import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ConverterPanelComponent } from './components/converter-panel/converter-panel.component';
import { DropdownsComponent } from './components/dropdowns/dropdowns.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';



@NgModule({
  declarations: [
    ConverterPanelComponent,
    DropdownsComponent,
    ButtonComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    ConverterPanelComponent,
    ButtonComponent,
    ChartComponent
  ]
})
export class SharedModule { }
