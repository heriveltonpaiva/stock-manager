import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPositionComponent } from './stock-position.component';

describe('StockPositionComponent', () => {
  let component: StockPositionComponent;
  let fixture: ComponentFixture<StockPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
