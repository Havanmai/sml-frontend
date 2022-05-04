import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHardwarestatusComponent } from './detail-hardwarestatus.component';

describe('DetailHardwarestatusComponent', () => {
  let component: DetailHardwarestatusComponent;
  let fixture: ComponentFixture<DetailHardwarestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailHardwarestatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHardwarestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
