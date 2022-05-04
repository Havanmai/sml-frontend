import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDeviceComponent } from './import-device.component';

describe('ImportDeviceComponent', () => {
  let component: ImportDeviceComponent;
  let fixture: ComponentFixture<ImportDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
