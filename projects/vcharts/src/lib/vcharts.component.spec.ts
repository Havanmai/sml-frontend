import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VchartsComponent } from './vcharts.component';

describe('VchartsComponent', () => {
  let component: VchartsComponent;
  let fixture: ComponentFixture<VchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
