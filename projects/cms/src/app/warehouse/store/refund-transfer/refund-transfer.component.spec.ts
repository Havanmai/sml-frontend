import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundTransferComponent } from './refund-transfer.component';

describe('RefundTransferComponent', () => {
  let component: RefundTransferComponent;
  let fixture: ComponentFixture<RefundTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
