import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPointsComponent } from './set-points.component';

describe('SetPointsComponent', () => {
  let component: SetPointsComponent;
  let fixture: ComponentFixture<SetPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
