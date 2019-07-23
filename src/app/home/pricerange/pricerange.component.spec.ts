import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricerangeComponent } from './pricerange.component';

describe('PricerangeComponent', () => {
  let component: PricerangeComponent;
  let fixture: ComponentFixture<PricerangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricerangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricerangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
