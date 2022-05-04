import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportDeviceModalComponent } from './dialog-import-device-modal.component';

describe('DialogImportDeviceModalComponent', () => {
  let component: DialogImportDeviceModalComponent;
  let fixture: ComponentFixture<DialogImportDeviceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImportDeviceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImportDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
