import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchNumberComponent } from './batch-number.component';

describe('BatchNumberComponent', () => {
  let component: BatchNumberComponent;
  let fixture: ComponentFixture<BatchNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
