import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsmodalComponent } from './transactionsmodal.component';

describe('TransactionsmodalComponent', () => {
  let component: TransactionsmodalComponent;
  let fixture: ComponentFixture<TransactionsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
