import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOperationComponent } from './total-operation.component';

describe('TotalOperationComponent', () => {
  let component: TotalOperationComponent;
  let fixture: ComponentFixture<TotalOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
