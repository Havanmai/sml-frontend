import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDetailOrderComponent } from './header-detail-order.component';

describe('HeaderDetailOrderComponent', () => {
  let component: HeaderDetailOrderComponent;
  let fixture: ComponentFixture<HeaderDetailOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDetailOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDetailOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
