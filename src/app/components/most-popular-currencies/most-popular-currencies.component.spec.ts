import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularCurrenciesComponent } from './most-popular-currencies.component';

describe('MostPopularCurrenciesComponent', () => {
  let component: MostPopularCurrenciesComponent;
  let fixture: ComponentFixture<MostPopularCurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularCurrenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostPopularCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
