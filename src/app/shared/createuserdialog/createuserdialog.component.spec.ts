import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateuserdialogComponent } from './createuserdialog.component';

describe('CreateuserdialogComponent', () => {
  let component: CreateuserdialogComponent;
  let fixture: ComponentFixture<CreateuserdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateuserdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateuserdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
