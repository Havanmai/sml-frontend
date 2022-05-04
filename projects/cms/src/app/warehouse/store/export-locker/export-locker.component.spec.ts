import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportLockerComponent } from './export-locker.component';

describe('ExportLockerComponent', () => {
  let component: ExportLockerComponent;
  let fixture: ComponentFixture<ExportLockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportLockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportLockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
