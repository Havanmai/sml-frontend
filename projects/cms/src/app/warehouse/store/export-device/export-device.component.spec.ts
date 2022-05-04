import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDeviceComponent } from './export-device.component';

describe('ExportDeviceComponent', () => {
  let component: ExportDeviceComponent;
  let fixture: ComponentFixture<ExportDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
