import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionmodalComponent } from './transactionmodal.component';

describe('TransactionmodalComponent', () => {
  let component: TransactionmodalComponent;
  let fixture: ComponentFixture<TransactionmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
