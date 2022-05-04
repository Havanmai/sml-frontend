import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCancelForwardComponent } from './complete-cancel-forward.component';

describe('CompleteCancelForwardComponent', () => {
  let component: CompleteCancelForwardComponent;
  let fixture: ComponentFixture<CompleteCancelForwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteCancelForwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteCancelForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
