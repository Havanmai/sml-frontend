import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerStatusComponent } from './locker-status.component';

describe('LockerStatusComponent', () => {
  let component: LockerStatusComponent;
  let fixture: ComponentFixture<LockerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockerStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
