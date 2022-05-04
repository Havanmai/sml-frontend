import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLockerComponent } from './create-locker.component';

describe('CreateLockerComponent', () => {
  let component: CreateLockerComponent;
  let fixture: ComponentFixture<CreateLockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
