import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeviceModalComponent } from './list-device-modal.component';

describe('ListDeviceModalComponent', () => {
  let component: ListDeviceModalComponent;
  let fixture: ComponentFixture<ListDeviceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeviceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
