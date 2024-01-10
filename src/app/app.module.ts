import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './pages/home/home.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DetailsComponent } from './pages/details/details.component';
import { MostPopularCurrenciesComponent } from './components/most-popular-currencies/most-popular-currencies.component';
import { HistoricalRatesComponent } from './components/historical-rates/historical-rates.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    MostPopularCurrenciesComponent,
    HistoricalRatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    HttpClientModule,
    LayoutModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
