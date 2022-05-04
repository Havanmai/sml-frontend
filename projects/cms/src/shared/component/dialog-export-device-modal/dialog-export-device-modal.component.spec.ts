import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExportDeviceModalComponent } from './dialog-export-device-modal.component';

describe('DialogExportDeviceModalComponent', () => {
  let component: DialogExportDeviceModalComponent;
  let fixture: ComponentFixture<DialogExportDeviceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExportDeviceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExportDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
